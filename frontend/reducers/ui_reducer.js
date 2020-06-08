import { SESSION_IS_LOADING, RESET_SESSION_LOADING } from '../actions/session_actions';
import { GROUPS_ARE_LOADING, RESET_GROUPS_LOADING } from '../actions/group_actions';
import { RECEIVE_MODAL, CLEAR_MODAL, SET_SCROLL_Y, SET_STICKY_TOOLBAR, CLEAR_STICKY_TOOLBAR, EXIT_MODAL } from '../actions/ui_actions';

const _baseUi = {
  sessionLoading: false,
  groupsLoading: false,
  stickyToolbar: 0,
  data: {
    scrollY: 0
  },
  modal: {
    type: "",
    data: {},
    offset: 0,
    exiting: false
  }
}

export default (state = _baseUi, action) => {
  Object.freeze(state);
  let newModal, newData;

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
      return Object.assign({}, state, {
        modal: action.modal,
        data: action.data,
      });
    case CLEAR_MODAL:
      return Object.assign({}, state, { modal: _baseUi.modal });
    case EXIT_MODAL:
      newModal = Object.assign({}, state.modal, {exiting: true});
      return Object.assign({}, state, { modal: newModal });
    case SET_SCROLL_Y:
      newData = Object.assign({}, state.data, { scrollY: action.scrollY });
      return Object.assign({}, state, { data: newData });
    case SET_STICKY_TOOLBAR:
      return Object.assign({}, state, { stickyToolbar: action.height });
    case CLEAR_STICKY_TOOLBAR:
      return Object.assign({}, state, { stickyToolbar: 0 });
    default:
      return state;
  }
}