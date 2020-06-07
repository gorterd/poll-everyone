export const fetchGroups = userId => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/groups`
  });
}

export const batchDestroy = selections => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/groups/batch_destroy`,
    data: selections
  });
}