import { combineReducers } from 'redux';
import users from './users_reducer';
import groups from './groups_reducer';
import polls from './polls_reducer';

export default combineReducers({
  users,
  groups,
  polls
});