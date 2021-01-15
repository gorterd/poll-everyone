export const currentUserIdSelector = state => state.session.currentId;
export const currentUserSelector = state => 
state.entities.users[state.session.currentId];

export const uiSelector = state => state.ui;
export const scrollYSelector = state => state.ui.scrollY;
export const stickyToolbarSelector = state => state.ui.stickyToolbar;

export const modalSelector = state => state.modal;
export const modalDataSelector = state => state.modal.data;

export const selectedPollsSelector = state => state.selections.polls;

export const orderedGroupsSelector = state => {
  return Object.values(state.entities.groups).sort(ordSort);
}

export const orderedGroupPollsSelector = groupId => state => {
  const { groups, polls } = state.entities;
  const group = groups[groupId];
  const pollIds = group?.pollIds;
  return pollIds && Object.values(polls)
    .filter(poll => pollIds.includes(poll.id))
    .sort(ordSort);
}

export const presenterPollDataSelector = pollId => state => {
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
