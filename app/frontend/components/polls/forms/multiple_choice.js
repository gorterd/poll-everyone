import React, { useEffect, useRef, useState } from 'react';
import LargeInput from '../../shared/large_input';
import { useObjectState, usePrevious } from '../../../util/custom_hooks';

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
    className={'correct-button button' + (selected ? ' selected' : '')}
    onClick={() => toggleCorrect(idx)}
  >
    <i className="fas fa-check"></i>
  </span>
)

const TrashButton = ({ idx, deleteAnswerOption }) => (
  <span className='trash-button button' onClick={() => deleteAnswerOption(idx)} >
    <i className="far fa-trash-alt"></i>
  </span>
)

export default function MultipleChoiceForm ({
  InputRightSideWrapper = ({ trashButton }) => <>{ trashButton }</>,
  initialFormData,
  render
}) {
  const [error, setError] = useState(nullError);
  const receivedData = useRef(false);
  const [formData, setFormData] = useObjectState({
    title: '',
    answerOptionsAttributes: [
      { correct: false, body: '', _id: Math.random() },
      { correct: false, body: '', _id: Math.random() },
    ]
  });

  const { title, answerOptionsAttributes } = formData;
  const oldAnswerOptions = usePrevious(answerOptionsAttributes);
  const filledOptions = answerOptionsAttributes.filter(option => option.body);

  useEffect(() => {
    if (initialFormData && !receivedData.current) {
      receivedData.current = true;
      setFormData(initialFormData, true);
    }
  }, [initialFormData])

  useEffect(() => {
    if (error.field === 'answerOptionsAttributes') {
      const addedOrDeletedFirstOption = (
        oldAnswerOptions.length === 0
        || answerOptionsAttributes.length === 0
      );

      if (addedOrDeletedFirstOption || filledOptions.length > 0) {
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
    setFormData({ answerOptionsAttributes: { [idx]: { body: e.target.value } } });
  }

  function toggleCorrect(idx) {
    setFormData(oldFormData => {
      const newCorrect = !oldFormData.answerOptionsAttributes[idx].correct;
      return { answerOptionsAttributes: { [idx]: { correct: newCorrect } } };
    });
  }

  function deleteAnswerOption(idx) {
    setFormData(({ answerOptionsAttributes }) => {
      answerOptionsAttributes.splice(idx, 1);
    }, true);
  }

  function addOption() {
    setFormData(({ answerOptionsAttributes }) => {
      answerOptionsAttributes.push({ correct: false, body: '', _id: Math.random() });
    }, true);
  }

  function handleSubmit(successCb) {
    if (!title) {
      setError(titleError);
    } else if (filledOptions.length === 0) {
      setError(answerOptionsAttributesError)
    } else {
      const processedAnswerOptions = filledOptions
        .map((option, idx) => ({ ...option, ord: idx }));

      successCb({
        ...formData,
        answerOptionsAttributes: processedAnswerOptions
      });
    }
  }

  const form = (
    <>
      <LargeInput
        klass='title-input-container'
        type='text'
        errorMsg={error.field === 'title' ? error.message : ''}
        text='Title'
        value={title}
        onChange={handleTitle}
      />

      { answerOptionsAttributes.map((option, idx) => (
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
          rightSide={InputRightSideWrapper}
          rightSideProps={{
            trashButton: <TrashButton
              idx={idx}
              deleteAnswerOption={deleteAnswerOption}
            />,
            idx
          }}
        />
      )) }

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
    </>
  )

  return render({ 
    form,
    handleSubmit,
    receivedData: receivedData.current
  }) 
}