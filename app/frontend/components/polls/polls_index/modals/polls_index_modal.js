import React, { useLayoutEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { exitModal } from '../../../../store/actions/ui_actions'

export default function SmallModal({
  header,
  subtext,
  inputProps,
  submissionHandler,
  submissionText,
  submissionDisabled,
  focusSubmit
}) {
  const dispatch = useDispatch()
  const closeModal = () => dispatch(exitModal())
  const onSubmit = () => submissionHandler(dispatch).then(closeModal)
  const submitButton = useRef()

  useLayoutEffect(() => {
    if (focusSubmit) submitButton.current.focus()
  }, [submitButton, focusSubmit])

  return (
    <>
      <h3>{header}</h3>
      <p>{subtext}</p>
      {inputProps && (
        <input
          autoFocus
          {...inputProps}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit()
          }}
        />
      )}
      <div className='buttons'>
        <button
          className='button-transparent'
          onClick={closeModal}
        >Cancel</button>

        <button
          className='button-blue'
          disabled={submissionDisabled}
          onClick={onSubmit}
          ref={submitButton}
        >{submissionText}</button>
      </div>
    </>
  )
}
