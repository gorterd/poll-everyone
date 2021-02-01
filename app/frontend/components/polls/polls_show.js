import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { isEqual, debounce } from 'lodash'

import cableConsumer from '../../channels/consumer'
import { presenterPollDataSelector } from '../../util/query_selectors'
import { standardGraph } from '../../util/data_formats_util'
import { useDelayedPrefetch, usePrevious } from '../../util/custom_hooks'
import { 
  receiveActivePoll, 
  clearActivePoll, 
  receiveResponse, 
  clearResponse 
} from '../../store/actions/presentation_actions'
import PresentationGraph from './polls_show/presentation_graph'
import { fetchEditPoll, fetchFooter, fetchGroupsIndex, fetchHomeSplash } from '../lazy_load_index'
import { usePoll } from '../../util/api/query_hooks'
import { useToggleActive } from '../../util/api/mutation_hooks'


export default function PresentPoll() {
  const prefetch = useCallback(() => {
    fetchEditPoll() 
    fetchGroupsIndex() 
    fetchHomeSplash() 
    fetchFooter()
  }, [])

  useDelayedPrefetch(prefetch)
  
  const history = useHistory()
  const dispatch = useDispatch()

  const currentId = useSelector( state => state.session.currentId )
  const { pollId } = useParams()
  const { data } = usePoll(pollId)
  const { poll, fullAnswerOptions } = presenterPollDataSelector(data)
  const { mutate: toggleActive } = useToggleActive()

  const formattedData = standardGraph(fullAnswerOptions)
  const prevFormattedData = usePrevious(formattedData)

  const graphContainer = useRef(null)
  const [graphDimensions, setGraphDimensions ] = useState({width: 0, height: 0})

  const subscription = useRef()

  const updateGraphDimensions = () => {
    if (!graphContainer.current) return
    const { width, height } = graphContainer.current.getBoundingClientRect()
    setGraphDimensions({ height, width })
  }

  const receiveBroadcast = useCallback(broadcast => {
    const response = JSON.parse(broadcast.data)

    switch (broadcast.type) {
      case 'POLL':
        response.poll.active 
          ? dispatch(receiveActivePoll(response)) 
          : dispatch(clearActivePoll())
        break
      case 'RESPONSE':
        dispatch(receiveResponse(response))
        break
      case 'CLEAR_RESPONSE':
        dispatch(clearResponse(response))
        break
    }
  }, [dispatch])

  const subscribe = useCallback(() => {
    subscription.current = cableConsumer.subscriptions.create(
      { channel: 'PresentationChannel', presenterId: currentId },
      { received: broadcast => receiveBroadcast(broadcast) }
    )
  }, [currentId, receiveBroadcast])


  useEffect(() => {
    if (poll?.active) {
      subscribe()
      return () => subscription.current?.unsubscribe()
    }
  }, [poll?.active, subscribe])

  useEffect(() => {
    updateGraphDimensions()

    const resizeListener = window.addEventListener(
      'resize',
      debounce(updateGraphDimensions, 100)
    )

    return () => window.removeEventListener('resize', resizeListener)
  }, [])

  return (
    <section className='show-poll-container'>
      <div className='show-poll-left'>
        <div className='graph-container' ref={graphContainer}>
          <div className='graph'>
            <PresentationGraph
              formattedData={formattedData}
              graphDimensions={graphDimensions}
              isAnimationActive={!isEqual(prevFormattedData, formattedData)}
            />
          </div>
        </div>
      </div>


      <div className='show-poll-right'>
        <div className='show-poll-executive-commands'>
          <Link 
            className='button-blue' 
            to={`/polls/${pollId}/edit`}
          >Edit</Link>

          <button 
            className='button-transparent'
            onClick={() => toggleActive(pollId)}
          >{poll?.active ? 'Deactivate' : 'Activate'}</button>

          <button 
            className='button-transparent' 
            onClick={history.goBack}
          >Back</button>
        </div>
      </div>
    </section>
  )
}