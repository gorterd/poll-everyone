import { RECEIVE_GROUPS } from '../../actions/group_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_GROUPS:
      return Object.assign({}, { ...action.groups });
    default:
      return state;
  }
}