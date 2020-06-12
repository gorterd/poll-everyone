import * as PollActions from './poll_actions'
import * as PresentationApiUtil from '../util/api/presentation_api_util'

export const RECEIVE_PARTICIPANT = 'RECEIVE_PARTICIPANT'
export const RECEIVE_ACTIVE_POLL = 'RECEIVE_ACTIVE_POLL'
export const CLEAR_ACTIVE_POLL = 'CLEAR_ACTIVE_POLL'
export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE'
export const CLEAR_RESPONSE = 'CLEAR_RESPONSE'
export const CLEAR_PRESENTATION = 'CLEAR_PRESENTATION'
export const RECEIVE_RECENT_PRESENTATIONS = 'RECEIVE_RECENT_PRESENTATIONS'


const receiveParticipant = participant => {
  return {
    type: RECEIVE_PARTICIPANT,
    participant
  }
}

export const clearPresentation = () => {
  return {
    type: CLEAR_PRESENTATION
  }
}

export const receiveActivePoll = data => {
  return {
    type: RECEIVE_ACTIVE_POLL,
    data
  }
}

export const clearActivePoll = () => {
  return {
    type: CLEAR_ACTIVE_POLL
  }
}

export const receiveResponse = response => {
  return {
    type: RECEIVE_RESPONSE,
    response
  }
}

export const clearResponse = response => {
  return {
    type: CLEAR_RESPONSE,
    response
  }
}

export const receiveRecentPresentations = recents => {
  return {
    type: RECEIVE_RECENT_PRESENTATIONS,
    recents
  }
}

export const fetchPresentation = (type, id, username) => dispatch => {
  return PresentationApiUtil.fetchPresentation(type, id, username)
    .then( data => {
      const { participant, ...rest } = data;
      dispatch(receiveParticipant(participant));
      if ( data.poll ) { 
        dispatch(receiveActivePoll(rest));
      }
      return data.participant;
    }, err => console.log(err.responseJSON));
}

export const fetchRecentPresentations = (type, id) => dispatch => {
  return PresentationApiUtil.fetchRecentPresentations(type, id)
    .then(data => {
      dispatch(receiveRecentPresentations(data.recents));
    }, err => console.log(err.responseJSON));
}
