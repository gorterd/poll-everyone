import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchGroups, batchDestroy } from "../../../actions/group_actions";
import { receiveGroupSelection, clearGroupSelection, clearSelections } from '../../../actions/selection_actions/poll_selection_actions'
import { orderedGroups } from "../../../util/selectors";
import {  } from "../../../actions/poll_actions";
import GroupsIndex from './groups_index';

const mapState = state => {
  return {
    orderedGroups: orderedGroups(state) || [],
    selections: state.selections.polls,
    currentUserId: state.session.currentId
  }
}

const mapDispatch = dispatch => {
  return {
    fetchGroups: userId => dispatch(fetchGroups(userId)),
    batchDestroy: selections => dispatch(batchDestroy(selections)),
    receiveGroupSelection: group => dispatch(receiveGroupSelection(group)),
    clearGroupSelection: group => dispatch(clearGroupSelection(group)),
    clearSelections: () => dispatch(clearSelections()),
  }
}

export default withRouter(connect(mapState, mapDispatch)(GroupsIndex));