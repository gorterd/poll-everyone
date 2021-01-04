const ordSort = (a, b) => Math.sign(a.ord - b.ord);

const getOrderedAnswerOptions = (poll, answerOptions) => {
  return Object.values(answerOptions)
    .filter(answerOption => poll.answerOptionIds.includes(answerOption.id))
    .sort(ordSort);
}

const optionResponses = (option, responses) => {
  return option.responseIds 
    ? responses.filter(response => option.responseIds.includes(response.id))
    : null;
}

export const presenterPollData = pollId => state => {
  const { entities: { polls, answerOptions, responses } } = state;
  const poll = polls[pollId];

  let fullAnswerOptions;
  if (poll?.answerOptionIds) {
    let orderedAnswerOptions = getOrderedAnswerOptions(poll, answerOptions);

    fullAnswerOptions = orderedAnswerOptions.map(option => {
      return Object.assign({}, option, {
        responses: optionResponses(option, Object.values(responses))
      });
    });
  };

  return { poll, fullAnswerOptions };
}
