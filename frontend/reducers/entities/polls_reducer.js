import { RECEIVE_POLLS, RECEIVE_POLL } from '../../actions/poll_actions';
import { RECEIVE_ACTIVE_POLL } from '../../actions/presentation_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  let newPoll;
  switch (action.type) {
    case RECEIVE_POLLS:
      return Object.assign({}, action.polls);
    case RECEIVE_POLL:
      newPoll = { [action.data.poll.id]: action.data.poll }
      return Object.assign( {}, state, poll );
    case RECEIVE_ACTIVE_POLL:
      newPoll = { [action.data.poll.id]: action.data.poll }
      return Object.assign( {}, state, poll );
    default:
      return state;
  }
}