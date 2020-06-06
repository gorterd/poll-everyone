import * as GroupsApiUtil from '../util/groups_api_util';

export const RECEIVE_GROUPS = 'RECEIVE_GROUPS';

export const receiveGroups = groups => {
  return {
    type: RECEIVE_GROUPS,
    groups
  }
}