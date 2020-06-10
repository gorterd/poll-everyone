const ordSort = (a, b) => Math.sign(a.ord - b.ord)

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
    const orderedAnswerOptions = Object.values(answerOptions)
      .filter(answerOption => poll.answerOptionIds.includes(answerOption.id))
      .sort(ordSort);
    return { poll, orderedAnswerOptions }
  } else { return null }
}