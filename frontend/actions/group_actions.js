import * as GroupsApiUtil from '../util/api/groups_api_util';
import * as PollActions from './poll_actions'

export const RECEIVE_GROUPS = 'RECEIVE_GROUPS';

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

export const batchDestroy = selections => dispatch => {
  dispatch(groupsAreLoading());

  return GroupsApiUtil.batchDestroy(selections)
    .then(
      data => {
        dispatch(receiveGroups(data.groups));
        dispatch(PollActions.receivePolls(data.polls));
        dispatch(resetGroupsLoading());
      }
    );
}
