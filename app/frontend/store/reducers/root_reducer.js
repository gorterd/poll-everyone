import { combineReducers } from 'redux'
import ui from './ui_reducer'
import modal from './modal_reducer'
import selections from './selections_reducer'

export default combineReducers({
  selections,
  modal,
  ui
})