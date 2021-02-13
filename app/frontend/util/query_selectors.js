export const pollDataOrderedGroupsSelector = data => 
  Object.values(data.groups).sort(ordSort)

export const pollDataSelector = data => 
  pollDataOrderedGroupsSelector(data)
    .map( group => ({
      group,
      polls: group.pollIds
        .map(id => data.polls[id])
        .sort(ordSort)
    }))

export const presenterPollDataSelector = data => {
  const { poll, answerOptions, responses } = data

  let fullAnswerOptions
  if (poll?.answerOptionIds) {
    let orderedAnswerOptions = Object.values(answerOptions).sort(ordSort)

    fullAnswerOptions = orderedAnswerOptions.map(option => {
      return Object.assign({}, option, {
        responses: optionResponses(option, Object.values(responses))
      })
    })
  }

  return { poll, fullAnswerOptions }
}

export const presentationParticipantSelector = data => {
  const { participation, poll, answerOptions, responses } = data
  if (!poll) return { participation }

  const ownResponses = Object.values(responses)
    .filter(res => res.participationId === participation.id)
  
  const orderedAnswerOptions = orderedAnswerOptionsSelector(answerOptions)
    .map( option => ({ 
      ...option, 
      numOwnResponses: ownResponses
        .filter(res => res.answerOptionId === option.id)
        .length
    }))

  return { participation, poll, ownResponses, orderedAnswerOptions }
}

export const orderedAnswerOptionsSelector = answerOptions => {
  return Object.values(answerOptions).sort(ordSort)
}

const ordSort = (a, b) => Math.sign(a.ord - b.ord)

const optionResponses = (option, responses) => {
  return option.responseIds
    ? responses.filter(response => option.responseIds.includes(response.id))
    : null
}