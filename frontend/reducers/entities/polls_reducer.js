import { RECEIVE_POLLS, RECEIVE_POLL } from '../../actions/poll_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POLLS:
      return Object.assign({}, action.polls);
    case RECEIVE_POLL:
      let poll = { [action.data.poll.id]: action.data.poll }
      return Object.assign( {}, state, poll );
    default:
      return state;
  }
}