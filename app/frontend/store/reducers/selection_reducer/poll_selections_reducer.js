import { 
  CLEAR_SELECTIONS, CLEAR_GROUP_SELECTION, RECEIVE_GROUP_SELECTION, RECEIVE_SELECTIONS, RECEIVE_POLL_SELECTION, CLEAR_POLL_SELECTION 
} from '../../actions/selection_actions/poll_selection_actions';

import { mergeArrays } from '../../../util/general_util'

const _nullSelection = {
  groupIds: [],
  pollIds: []
}

export default (state = _nullSelection, action) => {
  Object.freeze(state);

  let newGroupIds, newPollIds, groupIdx, pollIdx;
  switch (action.type) {

    case RECEIVE_SELECTIONS: 
      return action.data;

    case RECEIVE_GROUP_SELECTION:
      newPollIds = mergeArrays(state.pollIds, action.data.pollIds).map( id => parseInt(id) );
      newGroupIds = state.groupIds.includes(action.data.groupId) ? 
        state.groupIds : state.groupIds.concat(action.data.groupId);

      return { groupIds: newGroupIds, pollIds: newPollIds };

    case CLEAR_GROUP_SELECTION:
      newPollIds = state.pollIds.filter( id => !action.data.pollIds.includes(id) )
      groupIdx = state.groupIds.indexOf(action.data.groupId);
      newGroupIds = Array.from(state.groupIds);
      if ( groupIdx >= 0 ) { newGroupIds.splice(groupIdx, 1) }
      
      return { groupIds: newGroupIds, pollIds: newPollIds };

    case RECEIVE_POLL_SELECTION:
      newPollIds = state.pollIds.includes(action.data.pollId) ? 
        state.pollIds : state.pollIds.concat(action.data.pollId);

      newGroupIds = ( 
        action.data.group.pollIds.every( id => newPollIds.includes(id) ) 
        && !state.groupIds.includes(action.data.group.id)
      ) 
        ? state.groupIds.concat(action.data.group.id) 
        : state.groupIds;

      return { groupIds: newGroupIds, pollIds: newPollIds };

    case CLEAR_POLL_SELECTION:
      pollIdx = state.pollIds.indexOf(action.data.pollId);
      newPollIds = Array.from(state.pollIds);
      if ( pollIdx >= 0 ) { newPollIds.splice(pollIdx, 1) }

      groupIdx = state.groupIds.indexOf(action.data.group.id);
      newGroupIds = Array.from(state.groupIds);
      if (groupIdx >= 0) { newGroupIds.splice(groupIdx, 1) }
      
      return { groupIds: newGroupIds, pollIds: newPollIds };

    case CLEAR_SELECTIONS:
      return _nullSelection;
      
    default:
      return state;
  }
}