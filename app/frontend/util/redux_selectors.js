export const singleValueSelector = propPath => state => {
  const props = propPath.split(' ')
  return props.reduce( (prev, next) => prev?.[next], state)
}

export const stickyToolbarSelector = state => state.ui.stickyToolbar
export const modalSelector = state => state.modal
export const modalDataSelector = state => state.modal.data
export const selectedPollsSelector = state => state.selections.polls