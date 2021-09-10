import React, { useState } from 'react'
import { Animated } from './animated'
import { classNames } from '../../util/general_util'

export default function LargeInput({
  value,
  text,
  errorMsg,
  klass,
  leftSide: LeftSide,
  leftSideProps,
  rightSide: RightSide,
  rightSideProps,
  ...rest
}) {
  const [active, setActive] = useState(false)
  const showPlaceholder = !(active || value)

  const handleFocus = () => {
    if (!value) setActive(true)
  }

  const handleLeave = () => {
    if (!value) setActive(false)
  }

  const errorEle = errorMsg && (
    <div className="large-input-error-msg">{errorMsg}</div>
  )

  const enterAnimation = {
    animationName: 'slide-up-and-in',
    animationDuration: '200ms',
    animationIterationCount: 1,
    animationTimingFunction: 'ease-out',
    animationFillMode: 'forwards',
  }

  const exitAnimation = {
    animationName: 'slide-down-and-out',
    animationDuration: '200ms',
    animationIterationCount: 1,
    animationFillMode: 'forwards',
  }

  const animationProps = {
    interrupt: true,
    enterAnimation,
    exitAnimation
  }

  return (
    <div {...classNames(
      'large-input-container',
      klass,
      [errorMsg, 'input-error']
    )}>
      <div {...classNames(
        'large-input-wrapper',
        [active, 'activated'],
      )}>
        {LeftSide && <LeftSide {...leftSideProps} />}
        <div className='large-input'>
          <input
            {...classNames([!showPlaceholder, 'activated'])}
            onFocus={handleFocus}
            onBlur={handleLeave}
            value={value}
            {...rest}
          />
          <div {...classNames('small-input-label-container')}>
            <Animated
              {...animationProps}
              renderCondition={!showPlaceholder}
              noFirstAnimation={Boolean(value)}
            >
              <div {...classNames('small-input-label')}>
                {text}
              </div>
            </Animated>
          </div>
          <div {...classNames('placeholder-input-label-container')}>
            <Animated
              {...animationProps}
              renderCondition={showPlaceholder}
              noFirstAnimation={!value}
            >
              <div {...classNames('placeholder-input-label')}>
                {text}
              </div>
            </Animated>
          </div>
        </div>
        {RightSide && <RightSide {...rightSideProps} />}
      </div>
      {errorEle}
    </div>
  )
}