import { 
  RECEIVE_MODAL, 
  CLEAR_MODAL, 
  EXIT_MODAL, 
  CLEAR_MODAL_STATUS 
} from '../actions/ui_actions';

const baseModal = {
  type: "",
  data: {},
  offset: 0,
  status: null,
}

export default (state = baseModal, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_MODAL:
      return state.status 
        ? state
        : {...state, ...action.modal, status: 'entering' };
    case CLEAR_MODAL_STATUS:
      return { ...state, status: null };
    case EXIT_MODAL:
      return state.status || !state.type
        ? state
        : { ...state, status: 'exiting' };
    case CLEAR_MODAL:
      return baseModal;
    default:
      return state;
  }
}