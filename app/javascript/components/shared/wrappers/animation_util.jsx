import React from 'react';
import { useDispatch } from 'react-redux';
import { clearModal, clearStatus, exitModal } from '../../../store/actions/ui_actions';
import { useAnimation } from '../../../util/custom_hooks';

export function Animated ({
  children,
  className,
  renderCondition,
  enterAnimation,
  exitAnimation
}) {
  const [renderState, animationStyle, key] = useAnimation({
    renderCondition,
    enterAnimation,
    exitAnimation
  });

  return renderState && (
    <div style={animationStyle} className={className}>
      {children}
    </div>
  );
}

export function AnimatedModal ({
  component: Component, 
  modalData, modalClass, 
  backgroundStyle, backgroundClass, 
  renderCondition, 
  enterAnimation, 
  exitAnimation
}) {

  const dispatch = useDispatch();

  const [ renderState, animationStyle, key ] = useAnimation({
    renderCondition,
    enterAnimation,
    exitAnimation,
    afterEnter:  () => dispatch(clearStatus()),
    afterExit:  () => dispatch(clearModal()),
  });

  const style = {...backgroundStyle, ...animationStyle};
  const closeModal = () => dispatch(exitModal())

  return renderState && (
    <section 
      className={backgroundClass} 
      onClick={closeModal} 
      style={style} 
      key={key}
    >
      <div className={modalClass} onClick={e => e.stopPropagation()}>
        <Component modalData={modalData} closeModal={closeModal} />
      </div>
    </section>
  );
}



