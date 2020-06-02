import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

const receiveCurrentUser = user => {
  return {
    type: RECEIVE_CURRENT_USER,
    user
  }
}

const removeCurrentUser = id => {
  return {
    type: REMOVE_CURRENT_USER,
    id
  }
}
const receiveSessionErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  }
}

export const signup = user => dispatch => {
  return SessionApiUtil.signup(user)
    .then( 
      user => dispatch(receiveCurrentUser(user)),
      err => dispatch(receiveSessionErrors(err.responseJSON))
    );
}

export const updateUser = user => dispatch => {
  return SessionApiUtil.updateUser(user)
    .then( 
      user => dispatch(receiveCurrentUser(user)),
      err => dispatch(receiveSessionErrors(err.responseJSON))
    );
}

export const login = user => dispatch => {
  return SessionApiUtil.login(user)
    .then( 
      user => dispatch(receiveCurrentUser(user)),
      err => dispatch(receiveSessionErrors(err.responseJSON))
    );
}

export const logout = () => dispatch => {
  return SessionApiUtil.logout()
    .then( id => dispatch(removeCurrentUser(id)) );
}

