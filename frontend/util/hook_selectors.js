export const presenterPollData = (state) => {
  const { entities: { polls, answerOptions, responses } } = state;
  const poll = polls[pollId];

  let fullAnswerOptions;
  if (poll && poll.answerOptionIds) {
    let orderedAnswerOptions = getOrderedAnswerOptions(poll, answerOptions);

    fullAnswerOptions = orderedAnswerOptions.map(option => {
      return Object.assign({}, option, {
        responses: optionResponses(option, Object.values(responses))
      });
    });
  };

  return { poll, fullAnswerOptions };
}
