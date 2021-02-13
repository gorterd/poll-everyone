import { 
  RECEIVE_MODAL, 
  SET_SCROLL_Y, 
  SET_STICKY_TOOLBAR,
  COMPONENT_LOADING,
  COMPONENT_DONE_LOADING
} from '../actions/ui_actions'

const nullUi = {
  componentLoading: null,
  stickyToolbar: false,
  activeDropdownId: null,
  scrollY: 0,
}

export default (state = nullUi, action) => {
  Object.freeze(state)

  switch (action.type) {
    case SET_SCROLL_Y:
      return { ...state, scrollY: action.scrollY }
    case SET_STICKY_TOOLBAR:
      return { ...state, stickyToolbar: action.boolean }
    case RECEIVE_MODAL:
      return { ...state, scrollY: window.scrollY }
    case COMPONENT_LOADING:
      return { ...state, componentLoading: action.componentName }
    case COMPONENT_DONE_LOADING:
      return { ...state, componentLoading: null }
    default:
      return state
  }
}