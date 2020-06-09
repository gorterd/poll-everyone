import { RECEIVE_POLLS, RECEIVE_POLL } from '../../actions/poll_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POLLS:
      return Object.assign({}, action.polls);
    case RECEIVE_POLL:
      return Object.assign({}, action.data.polls);
    default:
      return state;
  }
}