import { SESSION_IS_LOADING, RESET_SESSION_LOADING } from '../../actions/session_actions';

const _nullSessionUi = {
  loading: false
}

export default (state = _nullSessionUi, action) => {
  switch (action.type) {
    case SESSION_IS_LOADING:
      return Object.assign({}, state, {loading: true});
    case RESET_SESSION_LOADING:
      return Object.assign({}, state, { loading: false });
    default:
      return state;
  }
}