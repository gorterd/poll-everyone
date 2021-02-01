import { RECEIVE_CURRENT_USER, REMOVE_CURRENT_USER } from '../../actions/session_actions'

export default (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER: {
      const currentUser = { [action.user.id]: action.user }
      return Object.assign({}, state, currentUser)
    }
    case REMOVE_CURRENT_USER: {
      const nextState = Object.assign({}, state)
      delete nextState[action.id]
      return nextState
    }
    default:
      return state
  }
}