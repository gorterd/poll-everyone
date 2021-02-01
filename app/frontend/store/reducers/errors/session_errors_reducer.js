import { RECEIVE_SESSION_ERRORS, RESET_SESSION_ERRORS } from '../../actions/session_actions'

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors
    case RESET_SESSION_ERRORS:
      return []
    default:
      return state
  }
}