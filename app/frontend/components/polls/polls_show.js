import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { isEqual, debounce } from 'lodash'
import { useQueryClient } from 'react-query'

import cableConsumer from '../../util/consumer'
import { presenterPollDataSelector } from '../../util/query_selectors'
import { standardGraph } from '../../util/data_formatting'
import { useDelayedPrefetch } from '../../hooks/effect'
import { usePrevious } from '../../hooks/general'
import PresentationGraph from './polls_show/presentation_graph'
import { useCurrent, usePoll } from '../../hooks/api/query'
import { useToggleActive } from '../../hooks/api/mutation'
import {
  fetchEditPoll,
  fetchFooter,
  fetchPollsIndex,
  fetchHomeSplash
} from '../lazy_load_index'
import Logo from '../shared/logo'

export default function PresentPoll() {
  const prefetch = useCallback(() => {
    fetchEditPoll()
    fetchPollsIndex()
    fetchHomeSplash()
    fetchFooter()
  }, [])

  useDelayedPrefetch(prefetch)

  const history = useHistory()
  const { data: { username, id: currentId } } = useCurrent()
  const { pollId } = useParams()
  const { data, isSuccess } = usePoll(pollId)
  const { mutate: toggleActive } = useToggleActive()
  const { poll, fullAnswerOptions } = isSuccess
    ? presenterPollDataSelector(data)
    : {}

  const formattedData = standardGraph(fullAnswerOptions)
  const prevFormattedData = usePrevious(formattedData)

  const graphWrapper = useRef(null)
  const [graphDimensions, setGraphDimensions] = useState({ width: 0, height: 0 })

  const updateGraphDimensions = () => {
    if (!graphWrapper.current) return
    const { width, height } = graphWrapper.current.getBoundingClientRect()
    setGraphDimensions({ height, width })
  }

  const queryClient = useQueryClient()
  const receiveBroadcast = useCallback(({ type }) => {
    if (['RESPONSE', 'CLEAR_RESPONSE'].includes(type)) {
      queryClient.invalidateQueries(['polls', pollId])
    }
  }, [queryClient, pollId])

  const subscription = useRef()
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
      debounce(updateGraphDimensions, 70)
    )

    return () => window.removeEventListener('resize', resizeListener)
  }, [])

  const graphReady = formattedData
    && Object.values(graphDimensions).every(dim => dim > 0)

  return (
    <section className='show-poll-container'>
      <div className='show-poll-left'>
        <div className='graph-container'>
          <h2>
            {poll?.active
              ? 'Respond at '
              : 'When poll is active, respond at '
            }
            <strong>poll-everyone.herokuapp.com/#/participate/{username}</strong>
          </h2>
          <div className='graph'>
            <h1>{poll?.title}</h1>
            <div className='graph-wrapper' ref={graphWrapper}>
              {graphReady &&
                <PresentationGraph
                  formattedData={formattedData}
                  graphDimensions={graphDimensions}
                  isAnimationActive={!isEqual(prevFormattedData, formattedData)}
                  activated={poll.active}
                />
              }
            </div>
          </div>
          <Logo onClick={() => { }} />
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