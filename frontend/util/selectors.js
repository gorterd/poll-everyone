const ordSort = (a, b) => Math.sign(a.ord - b.ord);
const dateSort = (a, b) => Math.sign(b.createdAt - a.createdAt);

export const orderedGroups = ({entities: { groups }}) => {
  return Object.values(groups).sort(ordSort);
}

export const orderedGroupPolls = (state, groupId) => {
  const { entities: { groups, polls}} = state;
  const group = groups[groupId];
  if (group && group.pollIds) {
    const groupPolls = Object.values(polls).filter( poll => group.pollIds.includes(poll.id) )
    return groupPolls.sort(ordSort);
  } else { return null }
}

export const pollData = (state, pollId) => {
  const { entities: { polls, answerOptions } } = state;
  const poll = polls[pollId];
  if (poll && poll.answerOptionIds){
    const orderedAnswerOptions = getOrderedAnswerOptions(poll, answerOptions);
    return { poll, orderedAnswerOptions }
  } else { return null }
}

const getOrderedAnswerOptions = (poll, answerOptions) => {
  return Object.values(answerOptions)
    .filter(answerOption => poll.answerOptionIds.includes(answerOption.id))
    .sort(ordSort);
}

const findActivePoll = state => {
  const activePollId = state.presentation.activePollId;
  return state.entities.polls[activePollId];
}

const optionResponses = (option, responses) => {
  return responses.filter(response => option.responseIds.includes(response.id));
}

export const participantPollData = state => {
  const participantId = state.presentation.participant.id;
  const activePoll = findActivePoll(state);
  
  if ( !activePoll ) { return {} }

  const ownResponses = state.entities.responses
    .filter( response => response.participantId === participantId)
    .sort(dateSort);

  const activeAnswerOptions = getOrderedAnswerOptions(activePoll, state.entities.answerOptions).map( option => {
    return Object.assign({}, option, { numOwnResponses: optionResponses(option, ownResponses).length })
  });

  return { activePoll, ownResponses, activeAnswerOptions };
}
