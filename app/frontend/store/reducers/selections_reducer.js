import { merge } from 'lodash'
import {
  CLEAR_SELECTIONS,
  CLEAR_GROUP_SELECTION,
  RECEIVE_GROUP_SELECTION,
  RECEIVE_SELECTIONS,
  RECEIVE_POLL_SELECTION,
  CLEAR_POLL_SELECTION
} from '../actions/selection_actions'

const nullSelection = {
  groupIds: [],
  pollIds: []
}

export default (state = nullSelection, action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_SELECTIONS:
      return action.data
    case RECEIVE_GROUP_SELECTION: {
      const newPollIds = merge([], state.pollIds, action.data.pollIds)
        .map(id => parseInt(id))
      const newGroupIds = state.groupIds.includes(action.data.groupId)
        ? Array.from(state.groupIds)
        : state.groupIds.concat(action.data.groupId)

      return { groupIds: newGroupIds, pollIds: newPollIds }
    }
    case CLEAR_GROUP_SELECTION: {
      const newPollIds = state.pollIds
        .filter(id => !action.data.pollIds.includes(id))
      const groupIdx = state.groupIds.indexOf(action.data.groupId)
      const newGroupIds = Array.from(state.groupIds)

      if (groupIdx >= 0) newGroupIds.splice(groupIdx, 1)

      return { groupIds: newGroupIds, pollIds: newPollIds }
    }
    case RECEIVE_POLL_SELECTION: {
      const newPollIds = state.pollIds.includes(action.data.pollId)
        ? Array.from(state.pollIds)
        : state.pollIds.concat(action.data.pollId)

      const newGroupIds = (
        action.data.group.pollIds.every(id => newPollIds.includes(id))
        && !state.groupIds.includes(action.data.group.id)
      )
        ? state.groupIds.concat(action.data.group.id)
        : Array.from(state.groupIds)

      return { groupIds: newGroupIds, pollIds: newPollIds }
    }
    case CLEAR_POLL_SELECTION: {
      const pollIdx = state.pollIds.indexOf(action.data.pollId)
      const newPollIds = Array.from(state.pollIds)
      if (pollIdx >= 0) newPollIds.splice(pollIdx, 1)

      const groupIdx = state.groupIds.indexOf(action.data.group.id)
      const newGroupIds = Array.from(state.groupIds)
      if (groupIdx >= 0) newGroupIds.splice(groupIdx, 1)

      return { groupIds: newGroupIds, pollIds: newPollIds }
    }
    case CLEAR_SELECTIONS:
      console.log(nullSelection)
      return nullSelection
    default:
      return state
  }
}