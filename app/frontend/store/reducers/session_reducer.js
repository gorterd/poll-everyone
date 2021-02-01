import { RECEIVE_CURRENT_USER, REMOVE_CURRENT_USER } from '../actions/session_actions'

const _nullSession = {
  currentType: null,
  currentId: null
}

export default (state = _nullSession, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        currentType: 'User',
        currentId: action.user.id,
      }
    case REMOVE_CURRENT_USER:
      return _nullSession
    default:
      return state
  }
}