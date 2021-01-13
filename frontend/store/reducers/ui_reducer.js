import { SESSION_LOADING, RESET_SESSION_LOADING } from '../actions/session_actions';
import { GROUPS_LOADING, RESET_GROUPS_LOADING } from '../actions/group_actions';
import { SET_SCROLL_Y, SET_STICKY_TOOLBAR } from '../actions/ui_actions';

const BASE_UI = {
  sessionLoading: false,
  groupsLoading: false,
  stickyToolbar: false,
  scrollY: 0
}

export default (state = BASE_UI, action) => {
  Object.freeze(state);

  switch (action.type) {
    case SESSION_LOADING:
      return { ...state, sessionLoading: true };
    case RESET_SESSION_LOADING:
      return { ...state, sessionLoading: false };
    case GROUPS_LOADING:
      return { ...state, groupsLoading: true };
    case RESET_GROUPS_LOADING:
      return { ...state, groupsLoading: false };
    case SET_SCROLL_Y:
      return { ...state, scrollY: action.scrollY };
    case SET_STICKY_TOOLBAR:
      return { ...state, stickyToolbar: action.boolean };
    default:
      return state;
  }
}