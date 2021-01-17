import React, { useEffect, useRef, useState } from 'react';
import { Animated } from './wrappers/animation_util';
import { classNames } from '../../util/general_util';

export default function LargeInp ({ 
  value,
  text,
  errorMsg,
  klass,
  leftSide: LeftSide,
  leftSideProps,
  rightSide: RightSide,
  rightSideProps,
  waitingForValue = false,
  ...rest  
}) {
  const [active, setActive] = useState(false);
  const showPlaceholder = !(active || value);
  const fadeIn = useRef(waitingForValue);

  // useEffect(() => {
  //   fadeIn.current = false;
  // }, [waitingForValue])

  const handleFocus = () => {
    if (!value) setActive(true);
  }

  const handleLeave = () => {
    if (!value) setActive(false);
  }

  const errorEle = errorMsg && (
    <div className="large-input-error-msg">{errorMsg}</div>
  );

  const enterAnimation = {
    animationName: "slide-up-and-in",
    animationDuration: "200ms",
    animationIterationCount: 1,
    animationTimingFunction: "ease-out",
    animationFillMode: "forwards",
  };

  const exitAnimation = {
    animationName: "slide-down-and-out",
    animationDuration: "200ms",
    animationIterationCount: 1,
    animationFillMode: "forwards",
  };

  const animationProps = {
    interruptAnimation: true,
    enterAnimation,
    exitAnimation
  }

  debugger 
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
        {!waitingForValue && (
          <>
            {LeftSide && <LeftSide {...leftSideProps} />}
            <input
              {...classNames([!showPlaceholder, 'activated'], [fadeIn.current, 'fade-in-short'])}
              onFocus={handleFocus}
              onBlur={handleLeave}
              value={value}
              {...rest}
            />
            <div {...classNames('small-input-label-container', [fadeIn.current, 'fade-in-short'])}>
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
            <div {...classNames('placeholder-input-label-container', [fadeIn.current, 'fade-in-short'])}>
              <Animated
                {...animationProps}
                renderCondition={showPlaceholder}
                noFirstAnimation={!Boolean(value)}
              >
                <div {...classNames('placeholder-input-label')}>
                  {text}
                </div>
              </Animated>
            </div>
            {RightSide && <RightSide {...rightSideProps} />}
          </>
        )}
      </div>
      {errorEle}
    </div>
  )
}