export const fetchGroups = userId => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/groups`
  });
}

export const createGroup = (data, userId) => {
  // debugger;
  return $.ajax({
    method: 'POST',
    url: `/api/users/${userId}/groups`,
    data
  });
}

export const batchDestroy = selections => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/groups/batch_destroy`,
    data: selections
  });
}