import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../../../actions/ui_actions';
import { defaultExitAnimation } from '../modal'

const NewPollToolbar = ({closeModal, hideOnSticky, stickyToolbar }) => {
  const klass = 'new-poll-toolbar' 
    + (stickyToolbar ? ' sticky-new-poll-toolbar' : '') 
    + ((stickyToolbar && hideOnSticky) ? ' hidden' : '');

  return (
    <div className={klass}>
      <button onClick={closeModal} className="button-blue">X</button>
    </div>
  )
}

const mapState = ({ ui: { stickyToolbar } }) => ({ stickyToolbar })


const mapDispatch = dispatch => {
  return { 
    closeModal: () => dispatch(closeModal(defaultExitAnimation.animationDuration || 0 ))
  }
}

export default connect(mapState, mapDispatch)(NewPollToolbar);