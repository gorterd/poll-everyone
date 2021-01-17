import * as SessionApiUtil from '../../util/api/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RESET_SESSION_ERRORS = 'RESET_SESSION_ERRORS';
export const SESSION_LOADING = 'SESSION_LOADING';
export const RESET_SESSION_LOADING = 'RESET_SESSION_LOADING';

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

export const resetSessionErrors = () => {
  return {
    type: RESET_SESSION_ERRORS
  }
}

const sessionIsLoading = () => {
  return {
    type: SESSION_LOADING
  }
}

const resetSessionLoading = () => {
  return {
    type: RESET_SESSION_LOADING
  }
}

export const signup = user => dispatch => {
  dispatch(sessionIsLoading());

  return SessionApiUtil.signup(user)
    .then( 
      user => {
        dispatch(receiveCurrentUser(user));
        dispatch(resetSessionLoading());
        dispatch(resetSessionErrors());
      }, err => {
        dispatch(receiveSessionErrors(err.responseJSON));
        dispatch(resetSessionLoading());
      }
    );
}

export const updateUser = user => dispatch => {
  dispatch(sessionIsLoading());

  return SessionApiUtil.updateUser(user)
    .then( 
      user => {
        dispatch(receiveCurrentUser(user));
        dispatch(resetSessionLoading());
        dispatch(resetSessionErrors());
      }, err => {
        dispatch(receiveSessionErrors(err.responseJSON));
        dispatch(resetSessionLoading());
      }
    );
}

export const login = user => dispatch => {
  dispatch(sessionIsLoading());

  return SessionApiUtil.login(user)
    .then( 
      user => {
        dispatch(receiveCurrentUser(user));
        dispatch(resetSessionLoading());
        dispatch(resetSessionErrors());
      }, err => {
        dispatch(receiveSessionErrors(err.responseJSON));
        dispatch(resetSessionLoading());
        return Promise.reject();
      }
    );
}

export const logout = () => dispatch => {
  return SessionApiUtil.logout()
    .then( id => dispatch(removeCurrentUser(id)) );
}

export const checkIfUserExists = usernameOrEmail => dispatch => {
  dispatch(sessionIsLoading());

  return SessionApiUtil.checkIfUserExists(usernameOrEmail)
    .then( 
      () => {
        dispatch(resetSessionLoading());
        dispatch(resetSessionErrors());
      }, err => {
        dispatch(receiveSessionErrors(err.responseJSON));
        dispatch(resetSessionLoading());
        return Promise.reject();
      }
    );
}
