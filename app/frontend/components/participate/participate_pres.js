import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from 'react-query'

import ResponseForm from './participate_pres/response_form'
import InactivePresentation from './participate_pres/inactive_pres'
import cableConsumer from '../../channels/consumer'
import { useCurrent, usePresentation } from '../../hooks/api/query'
import { presentationParticipantSelector } from '../../util/query_selectors'

const ParticipatePresentation = () => {
  const { data: { type, id } } = useCurrent()
  const { username } = useParams()
  const queryClient = useQueryClient()
  const query = useMemo(
    () => ['presentation', type, id, username], 
    [type, id, username]
  )

  const receivePoll = useCallback( data => 
    queryClient.setQueryData(query,
      ({ participation }) => ({ participation, ...data })
    ), [queryClient, query])

  const receiveResponse = useCallback( response => 
    queryClient.setQueryData(query,
      prevData => {
        const newResponses = { ...prevData.responses }
        delete newResponses.optimistic
        newResponses[response.id] = response
        return { ...prevData, responses: newResponses }
      }
    ), [queryClient, query])

  const clearResponse = useCallback( id => 
    queryClient.setQueryData(query,
      prevData => {
        const newResponses = { ...prevData.responses }
        delete newResponses[id]
        return { ...prevData, responses: newResponses }
      }
    ), [queryClient, query])
  
  const receiveBroadcast = useCallback(broadcast => {
    const data = JSON.parse(broadcast.data)

    switch (broadcast.type) {
      case 'POLL':
        return receivePoll(data)
      case 'RESPONSE':
        return receiveResponse(data)
      case 'CLEAR_RESPONSE':
        return clearResponse(data.id)
    }
  }, [receivePoll, receiveResponse, clearResponse])

  const subscription = useRef()
  const subscribe = useCallback((participationId, presenterId) => {
    subscription.current = cableConsumer.subscriptions.create(
      { channel: 'PresentationChannel', presenterId },
      { 
        received: broadcast => receiveBroadcast(broadcast),
        
        respond: function(answerOptionId) {
          receiveResponse({ answerOptionId, participationId, id: 'optimistic' })
          return this.perform('respond', { answerOptionId, participationId })
        },

        clear: function(id) {
          clearResponse(id)
          return this.perform('clear', { id })
        }
      }
    )
  }, [receiveBroadcast, receiveResponse, clearResponse])

  const { data, isSuccess } = usePresentation(type, id, username, {
    onSuccess: data => {
      if (!subscription.current) {
        const { participation: { id, presenterId } } = data
        subscribe(id, presenterId)
      }
    }
  })

  const {
    poll,
    participation,
    ownResponses,
    orderedAnswerOptions,
  } = isSuccess ? presentationParticipantSelector(data) : {}

  const clickAnswerOption = useCallback(id => subscription.current.respond(id), [])
  
  const clearLastResponse = useCallback( () => {
    const lastIdx = ownResponses.length - 1
    if (lastIdx >= 0) subscription.current.clear(ownResponses[lastIdx].id)
  }, [ownResponses])
  
  useEffect(() => subscription.current?.unsubscribe, [])

  return (
    <div className='participant-poll-container'>
      <div className='screenname-bar'>
        Responding {
          participation?.screenName 
            ? <>as <span>{participation.screenName}</span></> 
            : 'anonymously'
        }
      </div>
      { subscription.current && (
        poll?.active 
          ? <ResponseForm  
            answerOptions={orderedAnswerOptions} 
            numResponses={ownResponses?.length}
            poll={poll}
            clickAnswerOption={clickAnswerOption}
            clearLastResponse={clearLastResponse}
          />
          : <InactivePresentation username={username} />
      )}
    </div>
  )
}

export default ParticipatePresentation