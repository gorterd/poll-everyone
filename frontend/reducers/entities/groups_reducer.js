import { RECEIVE_GROUPS, RECEIVE_GROUP } from '../../actions/group_actions';
import { RECEIVE_POLL, RECEIVE_POLLS } from '../../actions/poll_actions';
import { concatIfNew } from '../../util/general_util';

export default (state = {}, action) => {
  Object.freeze(state);

  let newGroup, newPollIds;
  switch (action.type) {
    case RECEIVE_GROUPS:
      return Object.assign({}, action.groups );
    case RECEIVE_GROUP:
      newGroup = { [action.group.id]: action.group }
      return Object.assign({}, state, newGroup);
    case RECEIVE_POLL:
      let poll = action.data.poll;
      let group = state[poll.groupId];
      if (group) {
        newPollIds = concatIfNew(group.pollIds, poll.id);
        newGroup = Object.assign({}, group, { pollIds: newPollIds })
      } else {
        newGroup = { pollIds: [poll.id] };
      } 
      return Object.assign({}, state, { [poll.groupId]: newGroup  });
    default:
      return state;
  }
}