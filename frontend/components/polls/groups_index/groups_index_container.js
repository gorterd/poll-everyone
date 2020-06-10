import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {  } from "../../../actions/poll_actions";
import { fetchGroups, batchDestroy, movePolls } from "../../../actions/group_actions";
import { receiveGroupSelection, clearGroupSelection, receiveSelections, clearSelections } from '../../../actions/selection_actions/poll_selection_actions'
import { openModal, closeModal, setScrollY, setStickyToolbar, clearStickyToolbar } from '../../../actions/ui_actions';

import { orderedGroups } from "../../../util/selectors";

import GroupsIndex from './groups_index';

const mapState = state => {
  return {
    orderedGroups: orderedGroups(state) || [],
    selections: state.selections.polls,
    currentUserId: state.session.currentId,
    scrollY: state.ui.data.scrollY,
    stickyToolbar: state.ui.stickyToolbar,
    modalType: state.ui.modal.type,
    modalExiting: state.ui.modal.exiting
  }
}

const mapDispatch = dispatch => {
  return {
    fetchGroups: userId => dispatch(fetchGroups(userId)),
    batchDestroy: selections => dispatch(batchDestroy(selections)),
    movePolls: (pollIds, groupId) => dispatch(movePolls(pollIds, groupId)),
    receiveGroupSelection: group => dispatch(receiveGroupSelection(group)),
    clearGroupSelection: group => dispatch(clearGroupSelection(group)),
    receiveSelections: selections => dispatch(receiveSelections(selections)),
    clearSelections: () => dispatch(clearSelections()),
    setScrollY: scrollY => dispatch(setScrollY(scrollY)),
    setStickyToolbar: height => dispatch(setStickyToolbar(height)),
    clearStickyToolbar: () => dispatch(clearStickyToolbar()),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal(400)),
  }
}

export default withRouter(connect(mapState, mapDispatch)(GroupsIndex));