import { RECEIVE_POLLS, RECEIVE_POLL, RECEIVE_FULL_POLL } from '../../actions/poll_actions'
import { RECEIVE_ACTIVE_POLL } from '../../actions/presentation_actions'
import { twoTierMerge } from '../../../util/general_util'

export default (state = {}, action) => {
  Object.freeze(state)

  let newPoll
  switch (action.type) {
    case RECEIVE_POLLS:
      return twoTierMerge(state, action.polls )
    case RECEIVE_POLL:
      newPoll = { [action.data.poll.id]: action.data.poll }
      return Object.assign( {}, state, newPoll )
    case RECEIVE_ACTIVE_POLL:
      newPoll = { [action.data.poll.id]: action.data.poll }
      return Object.assign( {}, state, newPoll )
    case RECEIVE_FULL_POLL:
      newPoll = { [action.data.poll.id]: action.data.poll }
      return Object.assign( {}, state, newPoll )
    default:
      return state
  }
}