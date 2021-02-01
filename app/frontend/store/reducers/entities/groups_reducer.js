import { RECEIVE_GROUPS, RECEIVE_GROUP } from '../../actions/group_actions'
import { RECEIVE_POLL } from '../../actions/poll_actions'
import { mergeIdIntoState } from '../../../util/general_util'

export default (state = {}, action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_GROUPS:
      return Object.assign({}, action.groups )
    case RECEIVE_GROUP:
      return { ...state, [action.group.id]: action.group }
    case RECEIVE_POLL: {
      const { id: pollId, groupId } = action.data.poll
      return mergeIdIntoState(state, groupId, 'pollIds', pollId)
    }
    default:
      return state
  }
}