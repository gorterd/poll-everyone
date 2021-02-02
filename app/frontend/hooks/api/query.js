import { isEmpty } from 'lodash'
import { useQuery } from 'react-query'
import ajax from '../../util/ajax'

export const useCurrentUser = (options = {}) => useQuery(
  'currentUser', 
  () => ajax({ url: '/api/users/current' }), 
  {
    ...options,
  }
)

export const useLoggedIn = options => !isEmpty(useCurrentUser(options).data)

export const usePresentation = (type, id, username, options = {}) => useQuery(
  ['presentation', { type, id, username }], 
  () => ajax({
    url: '/api/users/presentation',
    data: { type, id, username }
  }), 
  options 
)

export const useRecentPresentations = (type, id, options = {}) => useQuery(
  ['recentPresentations', { type, id }], 
  () => ajax({
    url: '/api/participants/recents',
    data: { type, id }
  }), 
  options
)


export const usePoll = (pollId, options = {}) => useQuery(
  ['polls', pollId], 
  () => ajax({
    url: `/api/polls/${pollId}`,
    data: { fullData: true }
  }), 
  options
)


export const usePollData = (options = {}) => useQuery(
  'polls', 
  () => ajax({ url: '/api/groups' }),
  {
    initialData: { groups: {}, polls: {} },
    ...options
  }
)
