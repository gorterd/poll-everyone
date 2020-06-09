export const createPoll = (poll, groupId) => {
  return $.ajax({
    method: 'POST',
    url: `/api/groups/${groupId}/polls`,
    data: { poll }
  });
}