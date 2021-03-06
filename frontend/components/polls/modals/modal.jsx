import React from 'react';
import { connect} from 'react-redux';
import { closeModal } from '../../../actions/ui_actions';
import { AnimatedModal } from '../../../util/component/animation_util';
import NewPoll from './new_poll/new_poll';
import NewGroupModal from './groups/new_group';
import EditGroupModal from './groups/rename_group';
import ConfirmMoveModal from './confirm_move';
export const defaultEnterAnimation = {
  animationName: 'fade-in',
  animationDuration: '400ms',
  animationIterationCount: 1,
  animationFillMode: 'forwards'
}

export const defaultExitAnimation = {
  animationName: 'fade-out',
  animationDuration: '400ms',
  animationIterationCount: 1,
}

const ModalComponent = ({ modal, closeModal }) => {

  const NEW_POLL = 'new-poll';
  const NEW_GROUP = 'new-group';
  const EDIT_GROUP = 'edit-group';
  const CONFIRM_MOVE = 'confirm-move';

  const defaultBackgroundClass = 'standard-modal-background';
  const defaultModalClass = 'modal';

  const DEFAULTS = {
    modalData: modal.data,
    closeModal: closeModal,
    enterAnimation: defaultEnterAnimation,
    exitAnimation: defaultExitAnimation,
    backgroundClass: defaultBackgroundClass,
    backgroundStyle: null,
    modalClass: defaultModalClass,
    renderCondition: false
  }

  const newPollProps = Object.assign({}, DEFAULTS, { 
    modalClass: 'new-poll-modal',
    backgroundClass: 'new-poll-modal-background',
    backgroundStyle: { height: `calc(100vh - ${modal.offset}px)` },
    component: NewPoll
  });

  const newGroupProps = Object.assign({}, DEFAULTS, { 
    modalClass: 'new-group-modal',
    component: NewGroupModal 
  });

  const editGroupProps = Object.assign({}, DEFAULTS, { 
    modalClass: 'edit-group-modal',
    component: EditGroupModal 
  });

  const confirmMoveProps = Object.assign({}, DEFAULTS, { 
    modalClass: 'confirm-move-modal',
    component: ConfirmMoveModal 
  });
  
  if (!modal.exiting) {
    switch (modal.type) {
      case NEW_POLL:
        newPollProps.renderCondition = true;
        break;
      case NEW_GROUP:
        newGroupProps.renderCondition = true;
        break;
      case EDIT_GROUP:
        editGroupProps.renderCondition = true;
        break;
      case CONFIRM_MOVE:
        confirmMoveProps.renderCondition = true;
        break;
      default:
        break;
    }
  }
  
  return (
    <>
      <AnimatedModal {...newPollProps} />
      <AnimatedModal {...newGroupProps} />
      <AnimatedModal {...editGroupProps} />
      <AnimatedModal {...confirmMoveProps} />
    </>
  )
}

const mapState = ({ ui: { modal } }) => ({ modal })

const mapDispatch = dispatch => {
  return {
    closeModal: () => dispatch(closeModal(400))
  }
}

export const Modal = connect(mapState, mapDispatch)(ModalComponent);

