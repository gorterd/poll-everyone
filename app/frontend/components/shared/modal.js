import React from 'react';
import { useSelector} from 'react-redux';
import NewPoll from '../polls/polls_new';
import NewGroupModal from '../polls/polls_index/modals/new_group';
import EditGroupModal from '../polls/polls_index/modals/rename_group';
import ConfirmMoveModal from '../polls/polls_index/modals/confirm_move';
import { modalSelector } from '../../util/hooks_selectors';
import { useDispatch } from 'react-redux';
import { clearModal, clearStatus, exitModal } from '../../store/actions/ui_actions';
import { useAnimation } from '../../util/custom_hooks';

export const defaultEnterAnimation = {
  animationName: 'fade-in',
  animationDuration: '300ms',
  animationIterationCount: 1,
  animationFillMode: 'forwards'
}

export const defaultExitAnimation = {
  animationName: 'fade-out',
  animationDuration: '300ms',
  animationIterationCount: 1,
  animationFillMode: 'forwards'
}

export function Modal () {
  const modal = useSelector(modalSelector);

  const NEW_POLL = 'new-poll';
  const NEW_GROUP = 'new-group';
  const EDIT_GROUP = 'edit-group';
  const CONFIRM_MOVE = 'confirm-move';

  const defaultBackgroundClass = 'standard-modal-background';
  const defaultModalClass = 'modal';

  const DEFAULTS = {
    modalData: modal.data,
    modalClass: defaultModalClass,
    backgroundClass: defaultBackgroundClass,
    backgroundStyle: null,
    renderCondition: false,
    enterAnimation: defaultEnterAnimation,
    exitAnimation: defaultExitAnimation,
  }

  const newPollProps = Object.assign({}, DEFAULTS, { 
    modalClass: 'new-poll-modal',
    backgroundClass: 'new-poll-modal-background',
    backgroundStyle: { 
      height: `calc(100vh - ${modal.offset}px)`,
      zIndex: 1
    },
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

  if (!(modal.status === 'exiting')) {
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

function AnimatedModal({
  component: Component,
  modalData, modalClass,
  backgroundStyle, backgroundClass,
  renderCondition,
  enterAnimation,
  exitAnimation
}) {

  const dispatch = useDispatch();

  const [renderState, animationStyle, key] = useAnimation({
    renderCondition,
    enterAnimation,
    exitAnimation,
    afterEnter: () => dispatch(clearStatus()),
    afterExit: () => dispatch(clearModal()),
  });

  const style = { ...backgroundStyle, ...animationStyle };
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