import React from 'react';
import { connect} from 'react-redux';
import { closeModal } from '../actions/ui_actions';
import { AnimatedModal } from '../util/component/animation_util';
import NewPollForm from './polls/new_poll_form';

const Modal = ({ modal }) => {

  const NEW_POLL = 'new-poll';

  const defaultEnterAnimation = {
    animationName: 'fade-in',
    animationDuration: '400ms',
    animationIterationCount: 1,
  }

  const defaultExitAnimation = {
    animationName: 'fade-out',
    animationDuration: '300ms',
    animationIterationCount: 1,
  }

  const defaultBackgroundClass = 'standard-modal-background';
  const defaultModalClass = 'modal';

  const DEFAULTS = {
    enterAnimation: defaultEnterAnimation,
    exitAnimation: defaultExitAnimation,
    backgroundClass: defaultBackgroundClass,
    modalClass: defaultModalClass,
    renderCondition: false
  }

  const newPollProps = Object.assign({}, DEFAULTS, { 
    modalClass: 'new-poll-modal',
    component: NewPollForm 
  });

  switch (modal) {
    case NEW_POLL:
      newPollProps.renderCondition = true;
      break;
    default:
      break;
  }

  return (
    <>
      <AnimatedModal {...newPollProps} />
    </>
  )
}

const mapState = ({ ui: { modal } }) => ({ modal })

export default connect(mapState)(Modal);

