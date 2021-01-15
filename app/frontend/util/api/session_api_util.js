import ajax from './ajax';

export const signup = user => {
  return ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  });
}

export const updateUser = user => {
  return ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user }
  });
}

export const login = user => {
  return ajax({
    method: 'POST',
    url: '/api/session',
    data: { user }
  });
}

export const logout = () => {
  return ajax({
    method: 'DELETE',
    url: '/api/session'
  });
}

export const checkIfUserExists = usernameOrEmail => {
  return ajax({
    url: '/api/session/exists',
    data: { query: usernameOrEmail }
  })
}