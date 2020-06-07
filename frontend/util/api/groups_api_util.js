export const fetchGroups = userId => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/groups`
  });
}
