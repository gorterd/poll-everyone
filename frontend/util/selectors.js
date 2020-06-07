const ordSort = (a, b) => Math.sign(a.ord - b.ord)

export const orderedGroups = ({entities: { groups }}) => {
  return Object.values(groups).sort(ordSort);
}

export const orderedGroupPolls = (state, groupId) => {
  const { entities: { groups, polls}} = state
  const groupPolls = Object.values(polls).filter( poll => groups[groupId].pollIds.includes(poll.id) )
  return groupPolls.sort(ordSort);
}