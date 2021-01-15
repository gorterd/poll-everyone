import { combineReducers } from 'redux';
import entities from './entities/entities_reducer';
import ui from './ui_reducer';
import modal from './modal_reducer';
import errors from './errors/errors_reducer';
import session from './session_reducer';
import selections from './selection_reducer/selections_reducer'
import presentation from './presentation_reducer'

export default combineReducers({
  entities,
  selections,
  modal,
  ui,
  errors,
  session,
  presentation,
});