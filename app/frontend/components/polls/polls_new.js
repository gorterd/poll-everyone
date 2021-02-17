import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import MultipleChoiceForm from './forms/multiple_choice'
import { exitModal } from '../../store/actions/ui_actions'
import GroupSearch from '../shared/group_search'
import multipleChoiceOptionImg from '../../images/icons/multiple-choice-option.png'
import { useCreatePoll } from '../../hooks/api/mutation'
import { classNames } from '../../util/general_util'
import { graphql } from 'react-relay/hooks'
import { useFreshLazyLoadQuery } from '../../hooks/general'

export const pollsNewQuery = graphql`
  query pollsNewQuery {
    groups {
      _id
      ...groupSearch
    }
  }
`

const forms = {
  multiple_choice: MultipleChoiceForm,
}

export default function NewPollForm({ modalData }) {
  const { groups } = useFreshLazyLoadQuery(pollsNewQuery)
  const dispatch = useDispatch()
  const { mutateAsync: createPoll } = useCreatePoll()

  const [ activeOption, setActiveOption ] = useState('multiple_choice')
  const [ group, setGroup] = useState(modalData.group)

  const submitPoll = pollData => createPoll({ 
    poll: {
      ...pollData, 
      pollType: activeOption
    }, 
    groupId: group?._id || groups[0]._id
  }).then(() => dispatch(exitModal()))
  

  const Form = forms[activeOption]
  
  return (
    <section className='new-poll-container'>
      <div className='new-poll-toolbar'>
        <button
          onClick={() => dispatch(exitModal())}
          className="button-blue"
        >X</button>
      </div>
      
      <div className='new-poll-main'>
        <div className='new-poll-form-container'>

          <ul className='new-poll-options'>
            <li
              {...classNames(
                'new-poll-option', 
                [activeOption === 'multiple_choice', 'active-option']
              )}
              onClick={() => setActiveOption('multiple_choice')}
            >
              <img src={multipleChoiceOptionImg} alt='multiple-choice' />
              <span>Multiple choice</span>
            </li>
          </ul>

          <Form
            render={({
              form,
              handleSubmit,
            }) => (
              <>
                <div className='new-poll-form'>
                  <span>Ask a question and let participants choose from a list of answers.</span>
                  { form }
                </div>

                <div className='new-poll-bottom-bar'>
                  <GroupSearch
                    defaultGroup={modalData.group?.title}
                    setGroup={setGroup}
                    groupsRef={groups}
                    placeholderText='Assign activity to a group'
                  />

                  <button
                    className='button-blue'
                    tabIndex='2'
                    onClick={() => handleSubmit(submitPoll)}
                  >Create</button>
                </div>
              </>
            )}
          />
        </div>
      </div>
    </section>
  )
}

