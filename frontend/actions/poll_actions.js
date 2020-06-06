import * as PollsApiUtil from '../util/polls_api_util';

export const RECEIVE_POLLS = 'RECEIVE_POLLS';

export const receivePolls = polls => {
  return {
    type: RECEIVE_POLLS,
    polls
  }
}