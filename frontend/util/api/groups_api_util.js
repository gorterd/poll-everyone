export const fetchGroups = userId => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/groups`
  });
}

export const createGroup = (data, userId) => {
  return $.ajax({
    method: 'POST',
    url: `/api/users/${userId}/groups`,
    data
  });
}

export const updateGroup = (group) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/groups/${group.id}`,
    data: { group }
  });
}

export const batchDestroy = selections => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/groups/batch_destroy`,
    data: selections
  });
}

export const movePolls = (pollIds, groupId) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/groups/${groupId}/move_polls`,
    data: { pollIds }
  });
}