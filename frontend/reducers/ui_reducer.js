import { SESSION_IS_LOADING, RESET_SESSION_LOADING } from '../actions/session_actions';
import { GROUPS_ARE_LOADING, RESET_GROUPS_LOADING } from '../actions/group_actions';
import { RECEIVE_MODAL, CLEAR_MODAL } from '../actions/ui_actions';

const _baseUi = {
  sessionLoading: false,
  groupsLoading: false,
  stickyNav: true,
  modal: {
    type: "",
    data: {}
  }
}

export default (state = _baseUi, action) => {
  switch (action.type) {
    case SESSION_IS_LOADING:
      return Object.assign({}, state, { sessionLoading: true });
    case RESET_SESSION_LOADING:
      return Object.assign({}, state, { sessionLoading: false });
    case GROUPS_ARE_LOADING:
      return Object.assign({}, state, { groupsLoading: true });
    case RESET_GROUPS_LOADING:
      return Object.assign({}, state, { groupsLoading: false });
    case RECEIVE_MODAL:
      return Object.assign({}, state, { modal: action.modal });
    case CLEAR_MODAL:
      return Object.assign({}, state, { modal: _baseUi.modal });
    default:
      return state;
  }
}