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
  if (!data) return {}
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

export const orderedAnswerOptionsSelector = answerOptions => {
  return Object.values(answerOptions).sort(ordSort)
}

const ordSort = (a, b) => Math.sign(a.ord - b.ord)


const optionResponses = (option, responses) => {
  return option.responseIds
    ? responses.filter(response => option.responseIds.includes(response.id))
    : null
}