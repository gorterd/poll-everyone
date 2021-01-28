import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQueryClient } from 'react-query';
import MultipleChoiceForm from './multiple_choice_form';
import { exitModal } from '../../../../store/actions/ui_actions';
import GroupSearch from '../../../shared/group_search';
import multipleChoiceOptionImg from '../../../../images/icons/multiple-choice-option.png'
import { pollDataOrderedGroupsSelector } from '../../../../util/query_selectors';
import { useCreatePoll } from '../../../../util/api/mutation_hooks';
import { useCachedPollData } from '../../../../util/api/query_hooks';

const MULTIPLE_CHOICE = 'multiple_choice';

const FORM_COMPONENTS = {
  [MULTIPLE_CHOICE]: MultipleChoiceForm,
}

const errorKeys = {
  TITLE_BLANK: 'TITLE_BLANK',
  ANSWER_OPTIONS_BLANK: 'ANSWER_OPTIONS_BLANK',
}

const errorMessages = {
  TITLE_BLANK: 'Please enter a title',
  ANSWER_OPTIONS_BLANK: 'Please enter at least one response',
}

export default function NewPollForm({ modalData }) {
  const dispatch = useDispatch();
  const { mutateAsync: createPoll } = useCreatePoll();
  const pollData = useCachedPollData();
  const groups = pollDataOrderedGroupsSelector(pollData);

  const [ activeOption, setActiveOption ] = useState(MULTIPLE_CHOICE);
  const [ group, setGroup] = useState(modalData.group)
  const [ error, setError] = useState('');

  function submitPoll(formData) {
    if (!formData.title) {
      setError(errorKeys.TITLE_BLANK);
    } else if (formData.answerOptionsAttributes.length === 0) {
      setError(errorKeys.ANSWER_OPTIONS_BLANK);
    } else {
      const answerOptionsAttributes = formData.answerOptionsAttributes
        .map((option, idx) => (Object.assign(option, { ord: idx })));
      const data = Object.assign(
        formData, 
        { pollType: activeOption, answerOptionsAttributes }
      );
      const groupId = group?.id || groups[0].id;
      
      createPoll({ poll: data, groupId })
        .then(() => dispatch(exitModal()));
    }
  } 

  const Form = FORM_COMPONENTS[activeOption];

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
              className={'new-poll-option' + (activeOption === MULTIPLE_CHOICE ? ' active-option' : '')}
              onClick={() => setActiveOption(MULTIPLE_CHOICE)}
            >
              <img src={multipleChoiceOptionImg} alt='multiple-choice' />
              <span>Multiple choice</span>
            </li>
          </ul>

          <Form
            createPoll={submitPoll}
            clearErrors={() => setError('')}
            error={error}
            errorKeys={errorKeys}
            errorMessages={errorMessages}
          />

          <div className='new-poll-bottom-bar'>
            <GroupSearch
              defaultGroup={modalData.group?.title}
              setGroup={setGroup}
              groups={groups}
              placeholderText='Assign activity to a group'
            />
          </div>
        </div>
      </div>
    </section>
  )
}