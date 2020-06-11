export const fetchPresentation = (type, id, username) => {
  return $.ajax({
    method: 'GET',
    url: '/api/users/presentation',
    data: { type, id, username }
  });
}