import * as PollsApiUtil from '../util/api/polls_api_util';

export const RECEIVE_POLLS = 'RECEIVE_POLLS';
export const RECEIVE_POLL = 'RECEIVE_POLL';

export const receivePolls = polls => {
  return {
    type: RECEIVE_POLLS,
    polls
  }
}

export const receivePoll = data => {
  return {
    type: RECEIVE_POLL,
    data
  }
}

export const createPoll = (pollData, groupId) => dispatch => {
  return PollsApiUtil.createPoll(pollData, groupId)
    .then(
      data => {
        dispatch(receivePoll(data));
      }, err => {
        console.log(err.responseJSON);
      }
    );
}