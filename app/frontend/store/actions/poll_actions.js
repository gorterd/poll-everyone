import * as PollsApiUtil from '../../util/api/polls_api_util'

export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const RECEIVE_POLL = 'RECEIVE_POLL'
export const RECEIVE_FULL_POLL = 'RECEIVE_FULL_POLL'

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

export const receiveFullPoll = data => {
  return {
    type: RECEIVE_FULL_POLL,
    data
  }
}

export const fetchPoll = (pollId) => dispatch => {
  return PollsApiUtil.fetchPoll(pollId)
    .then(
      data => {
        dispatch(receivePoll(data))
      }, err => {
        console.log(err)
      }
    )
}

export const fetchFullPoll = (pollId) => dispatch => {
  return PollsApiUtil.fetchFullPoll(pollId)
    .then(
      data => {
        dispatch(receiveFullPoll(data))
        return data.poll
      }, err => {
        console.log(err)
      }
    )
}

export const createPoll = (pollData, groupId) => dispatch => {
  return PollsApiUtil.createPoll(pollData, groupId)
    .then(
      data => {
        dispatch(receivePoll(data))
      }, err => {
        console.log(err)
      }
    )
}

export const updatePoll = (data, pollId) => dispatch => {
  return PollsApiUtil.updatePoll(data, pollId)
    .then(
      data => {
        dispatch(receivePoll(data))
      }, err => {
        console.log(err)
      }
    )
}

export const duplicatePoll = pollId => dispatch => {
  return PollsApiUtil.duplicatePoll(pollId)
    .then(
      data => {
        dispatch(receivePoll(data))
      }, err => {
        console.log(err)
      }
    )
}

export const toggleActive = pollId => dispatch => {
  return PollsApiUtil.toggleActive(pollId)
    .then(
      data => {
        dispatch(receivePolls(data.polls))
      }, err => {
        console.log(err)
      }
    )
}