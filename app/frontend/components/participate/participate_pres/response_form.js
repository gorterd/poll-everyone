import React from 'react'
import { useObjectState } from '../../../hooks/state'
import { classNames } from '../../../util/general_util'

const ResponseForm = props => {
  const {
    poll: { title, numResponsesAllowed },
    answerOptions,
    numResponses,
    clickAnswerOption,
    clearLastResponse
  } = props

  const [animations, setAnimations] = useObjectState({})
  const numLeft = numResponsesAllowed - numResponses
  const disabledClear = numResponses === 0
  const disabledAnswer = numLeft === 0

  const pollSubText = numLeft === 0
    ? 'You have responded the max number of times'
    : numLeft === numResponsesAllowed
      ? `You can respond ${numLeft} times`
      : `You have ${numLeft} response${numLeft > 1 ? 's' : ''} remaining`

  const handleClick = id => () => {
    if (!disabledAnswer) {
      clickAnswerOption(id)
      setAnimations({ [id]: true })
    }
  } 

  const options = answerOptions.map(option => (
    <li key={option.id}>
      <button
        disabled={disabledAnswer}
        onClick={handleClick(option.id)}
        onAnimationEnd={() => setAnimations({ [option.id]: false })}
        {...classNames(
          'answer-option-button',
          [option.numOwnResponses > 0, 'answered'],
          [animations[option.id], 'animate'],
        )}
      >
        <span className='num-responses'>{option.numOwnResponses}</span>
        <span className='answer-body'>{option.body}</span>
      </button>
    </li>
  ))

  return (
    <div className='participant-poll'>
      <h3>{title}</h3>
      <span>{pollSubText}</span>
      <ul>
        {options}
      </ul>
      <button
        className='button-clear'
        disabled={disabledClear}
        onClick={clearLastResponse}
      >Clear last response</button>
    </div>
  )
}

export default ResponseForm