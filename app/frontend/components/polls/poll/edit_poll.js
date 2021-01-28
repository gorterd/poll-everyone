import React, { useEffect, useRef, useState } from 'react';
import LargeInput from '../../shared/large-animated-input';
import { useHistory, useParams } from 'react-router-dom';
import { useObjectState, usePrevious } from '../../../util/custom_hooks';
import { usePoll } from '../../../util/api/query_hooks';
import { partition } from 'lodash';
import { useUpdatePoll } from '../../../util/api/mutation_hooks';
import { orderedAnswerOptionsSelector } from '../../../util/query_selectors';

const nullError = {
  field: null,
  message: '',
}

const titleError = {
  field: 'title',
  message: 'Please enter a title',
}

const answerOptionsAttributesError = {
  field: 'answerOptionsAttributes',
  message: 'Please enter at least one response',
}

const CorrectButton = ({ selected, idx, toggleCorrect }) => (
  <span
    className={`correct-button button` + (selected ? ' selected' : '')}
    onClick={() => toggleCorrect(idx)}
  >
    <i className="fas fa-check"></i>
  </span>
)

const TrashButton = ({ idx, deleteAnswerOption }) => (
  <div className='edit-poll-input-right-side'>
    <span className='trash-button button' onClick={() => deleteAnswerOption(idx)} >
      <i className="far fa-trash-alt"></i>
    </span>
    <span>{String.fromCharCode(idx + 65)}</span>
  </div>
)


export default function EditPoll () {
  const { mutateAsync: updatePoll } = useUpdatePoll();
  const history = useHistory();
  const { pollId } = useParams();
  const deleted = useRef([]);
  const [error, setError] = useState(nullError);
  const [ formData, setFormData] = useObjectState({
    title: ' ',
    answerOptionsAttributes: []
  });
  
  const { title, answerOptionsAttributes } = formData;
  const oldAnswerOptions = usePrevious(answerOptionsAttributes);
  const [ filledOptions, emptyOptions ] = partition( answerOptionsAttributes, 
    option => option.body );

  const { isSuccess } = usePoll(pollId, {
    onSuccess: (data) => {
      const formAnswerOptions = orderedAnswerOptionsSelector(data.answerOptions)
        .map(({ correct, body, id }) => ({ correct, body, id }));

      setFormData({ 
        title: data.poll.title,
        answerOptionsAttributes: formAnswerOptions 
      });
    }
  });

  useEffect(() => {
    if (error.field === 'answerOptionsAttributes') {
      const addedOrDeletedFirstOption = (
        oldAnswerOptions.length === 0 
        || answerOptionsAttributes.length === 0
      );
  
      if ( addedOrDeletedFirstOption || filledOptions.length > 0 ) {
        setError(nullError);
      }
    }

  }, [answerOptionsAttributes]);

  useEffect(() => {
    if (error.field === 'title') setError(nullError);
  }, [title]);

  function handleTitle(e) {
    setFormData({ title: e.target.value });
  }

  function handleAnswerBody(e, idx) {
    setFormData({ answerOptionsAttributes: { [idx]: { body: e.target.value }} });
  }

  function toggleCorrect(idx) {
    setFormData( oldFormData => {
      const newCorrect = !oldFormData.answerOptionsAttributes[idx].correct;
      return { answerOptionsAttributes: { [idx]: { correct: newCorrect } } };
    });
  }

  function deleteAnswerOption(idx) {
    setFormData(({ answerOptionsAttributes }) => {
      const deletedId = answerOptionsAttributes[idx].id;
      if (deletedId) deleted.current.push(deletedId);
      answerOptionsAttributes.splice(idx, 1);
    }, true);
  }

  function addOption() {
    setFormData(({ answerOptionsAttributes }) => {
      answerOptionsAttributes.push({ correct: false, body: '', _id: Math.random() });
    }, true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if ( !title ) {
      setError(titleError);
    } else if ( filledOptions.length === 0 ) {
      setError(answerOptionsAttributesError)
    } else {      
      updatePoll(getProcessedUpdateData())
        .then(() => history.goBack());
    }
  }

  function getProcessedUpdateData() {
    emptyOptions.forEach(option => {
      if (option.id) deleted.current.push(option.id);
    })

    const processedAnswerOptions = filledOptions
      .map((option, idx) => ({ ...option, ord: idx }))
      .concat(deleted.current.map(id => ({ id, '_destroy': 1 })));

    return { 
      poll: {
        ...formData,
        answerOptionsAttributes: processedAnswerOptions
      },
      pollId
    }
  }


  return (
    <form onSubmit={handleSubmit} className='edit-poll-form multiple-choice-form'>
      <div className='edit-poll-form-left'>
          { isSuccess && <LargeInput
          klass='title-input-container'
          type='text'
          errorMsg={error.field === 'title' ? error.message : ''}
          text='Title'
          value={title}
          onChange={handleTitle}
        />}

        {answerOptionsAttributes.map((option, idx) => (
          <LargeInput
            key={option.id || option._id}
            klass='answer-option-input-container'
            type='text'
            errorMsg={
              error.field === 'answerOptionsAttributes' && !idx 
                ? error.message 
                : ''
            }
            text='Text'
            value={option.body}
            onChange={e => handleAnswerBody(e, idx)}
            leftSide={CorrectButton}
            leftSideProps={{ selected: option.correct, idx, toggleCorrect }}
            rightSide={TrashButton}
            rightSideProps={{ idx, deleteAnswerOption }}
          />
        ))}

        <div>
          <span className='button-blue-alt' onClick={addOption}>
            <i className="fas fa-plus"></i><span>Add option</span>
          </span>
          {
            answerOptionsAttributes.length === 0 
            && error.field === 'answerOptionsAttributes' 
              ? <span>{error.message}</span> 
              : null
          }
        </div>
      </div>

      <div className='edit-poll-form-right'>
        <div className='edit-poll-executive-commands'>
          <button className='button-blue' type='submit' onClick={handleSubmit}>Save</button>
          <button className='button-transparent' 
            onClick={ (e) => {
              e.preventDefault();
              history.goBack();
            }}
          >Cancel</button>
        </div>
      </div>

    </form>
  )
};