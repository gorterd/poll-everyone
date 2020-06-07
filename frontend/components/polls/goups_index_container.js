import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchGroups } from "../../actions/group_actions";
import { orderedGroups } from "../../util/selectors";
import {  } from "../../actions/poll_actions";
import GroupsIndex from './groups_index';

const mapState = state => {
  return {
    orderedGroups: orderedGroups(state) || [],
    currentUserId: state.session.currentId
  }
}

const mapDispatch = dispatch => {
  return {
    fetchGroups: userId => dispatch(fetchGroups(userId)),
  }
}

export default withRouter(connect(mapState, mapDispatch)(GroupsIndex));