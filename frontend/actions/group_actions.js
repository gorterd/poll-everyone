import * as GroupsApiUtil from '../util/api/groups_api_util';
import * as PollActions from './poll_actions'
import { clearSelections } from './selection_actions/poll_selection_actions';

export const RECEIVE_GROUPS = 'RECEIVE_GROUPS';
export const RECEIVE_GROUP = 'RECEIVE_GROUP';

export const GROUPS_ARE_LOADING = 'GROUPS_ARE_LOADING';
export const RESET_GROUPS_LOADING = 'RESET_GROUPS_LOADING';

const groupsAreLoading = () => {
  return {
    type: GROUPS_ARE_LOADING
  }
}

const resetGroupsLoading = () => {
  return {
    type: RESET_GROUPS_LOADING
  }
}

const receiveGroups = groups => {
  return {
    type: RECEIVE_GROUPS,
    groups
  }
}

const receiveGroup = group => {
  return {
    type: RECEIVE_GROUP,
    group
  }
}

export const fetchGroups = userId => dispatch => {
  dispatch(groupsAreLoading());

  return GroupsApiUtil.fetchGroups(userId)
    .then(
      data => {
        dispatch(receiveGroups(data.groups));
        dispatch(PollActions.receivePolls(data.polls));
        dispatch(resetGroupsLoading());
      }
    ); 
}

export const createGroup = (data, userId) => dispatch => {
  dispatch(groupsAreLoading());

  return GroupsApiUtil.createGroup(data, userId)
    .then(
      data => {
        if (data.groups) {
          dispatch(receiveGroups(data.groups));
          dispatch(PollActions.receivePolls(data.polls));
        } else {
          dispatch(receiveGroup(data));
        }
        dispatch(resetGroupsLoading());
      }, err => {
        console.log(err.responseJSON);
      }
    );
}

export const updateGroup = (group) => dispatch => {
  dispatch(groupsAreLoading());

  return GroupsApiUtil.updateGroup(group)
    .then(
      group => {
        dispatch(receiveGroup(group));
        dispatch(resetGroupsLoading());
      }, err => {
        console.log(err.responseJSON);
      }
    );
}

export const batchDestroy = selections => dispatch => {
  dispatch(groupsAreLoading());
  dispatch(clearSelections());

  return GroupsApiUtil.batchDestroy(selections)
    .then(
      data => {
        dispatch(receiveGroups(data.groups));
        dispatch(PollActions.receivePolls(data.polls));
        dispatch(resetGroupsLoading());
      }
    );
}

export const movePolls = (pollIds, groupId) => dispatch => {
  dispatch(groupsAreLoading());
  dispatch(clearSelections());

  return GroupsApiUtil.movePolls(pollIds, groupId)
    .then(
      data => {
        dispatch(receiveGroups(data.groups));
        dispatch(PollActions.receivePolls(data.polls));
        dispatch(resetGroupsLoading());
      }
    );
}
