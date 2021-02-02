import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { usePoll } from '../../hooks/api/query'
import { useUpdatePoll } from '../../hooks/api/mutation'
import { orderedAnswerOptionsSelector } from '../../util/query_selectors'
import MultipleChoiceForm from './forms/multiple_choice'

export default function EditPoll () {
  const { mutateAsync: updatePoll } = useUpdatePoll()
  const history = useHistory()
  const { pollId } = useParams()
  const [ initialFormData, setInitialFormData ] = useState()

  usePoll(pollId, {
    onSuccess: (data) => {
      const formAnswerOptions = orderedAnswerOptionsSelector(data.answerOptions)
        .map(({ correct, body, id }) => ({ correct, body, id }))

      setInitialFormData({ 
        title: data.poll.title,
        answerOptionsAttributes: formAnswerOptions 
      })
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  const submitPoll = poll => updatePoll({poll, pollId})
    .then(() => history.goBack())
  
  return (
    <div className='edit-poll-form multiple-choice-form'>
      <MultipleChoiceForm 
        initialFormData={initialFormData}

        InputRightSideWrapper={({ trashButton, idx }) => (
          <div className='edit-poll-input-right-side'>
            { trashButton }
            <span>{String.fromCharCode(idx + 65)}</span>
          </div>
        )}

        render={ ({    
          form,
          handleSubmit,
          receivedData,
        }) => (
          <>
            <div className='edit-poll-form-left'>
              { receivedData && form }
            </div>

            <div className='edit-poll-form-right'>
              <div className='edit-poll-executive-commands'>
                <button 
                  className='button-blue' 
                  onClick={() => handleSubmit(submitPoll)}
                >Save</button>
                <button className='button-transparent' 
                  onClick={ () => history.goBack() }
                >Cancel</button>
              </div>
            </div>
          </>
        )} 
      />
    </div>
  )
}