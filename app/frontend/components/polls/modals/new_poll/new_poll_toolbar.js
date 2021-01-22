import React from 'react';
import { connect } from 'react-redux';
import { closeModal, exitModal } from '../../../../store/actions/ui_actions';
import { defaultExitAnimation } from '../../../shared/modal'

const NewPollToolbar = ({closeModal, hideOnSticky, stickyToolbar }) => {
  const klass = 'new-poll-toolbar' 
    // + (stickyToolbar ? ' sticky-new-poll-toolbar' : '') 
    // + ((stickyToolbar && hideOnSticky) ? ' hidden' : '');

  return (
    <div className={klass}>
      <button onClick={closeModal} className="button-blue">X</button>
    </div>
  )
}

const mapState = ({ ui: { stickyToolbar } }) => ({ stickyToolbar })


const mapDispatch = dispatch => {
  return { 
    closeModal: () => dispatch(exitModal())
    // closeModal: () => dispatch(closeModal(defaultExitAnimation.animationDuration || 0 ))
  }
}

export default connect(mapState, mapDispatch)(NewPollToolbar);