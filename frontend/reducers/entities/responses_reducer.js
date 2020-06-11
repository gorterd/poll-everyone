import { 
  RECEIVE_ACTIVE_POLL,
  RECEIVE_RESPONSE,
  CLEAR_RESPONSE
} from '../../actions/presentation_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ACTIVE_POLL:
      return Object.assign({}, action.data.responses);
    case RECEIVE_RESPONSE:
      const response = { [action.response.id]: action.response }
      return Object.assign({}, state, response);
    case CLEAR_RESPONSE:
      const newState = Object.assign({}, state);
      delete newState[response.id];
      return newState;
    default:
      return state;
  }
}