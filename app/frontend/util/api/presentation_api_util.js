import ajax from './ajax'

export const fetchPresentation = (type, id, username) => {
  return ajax({
    method: 'GET',
    url: '/api/users/presentation',
    data: { type, id, username }
  })
}

export const fetchRecentPresentations = (type, id) => {
  return ajax({
    method: 'GET',
    url: '/api/participants/recents',
    data: { type, id }
  })
}