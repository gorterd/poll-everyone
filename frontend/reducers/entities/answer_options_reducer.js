import { RECEIVE_POLL } from '../../actions/poll_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POLL:
      return Object.assign({}, action.data.answerOptions );
    default:
      return state;
  }
}