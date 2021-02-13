import { useQuery } from 'react-query'
import ajax from '../../util/ajax'

export const useCurrent = (options = {}) => useQuery(
  'current', 
  () => ajax({ url: '/api/session/current' }), 
  {
    staleTime: Infinity,
    ...options,
  }
)

export const useLoggedIn = options => useCurrent(options).data?.type === 'User'

export const usePolls = (options = {}) => useQuery(
  'polls', 
  () => ajax({ url: '/api/groups' }),
  {
    ...options
  }
)

export const usePoll = (pollId, options = {}) => useQuery(
  ['polls', pollId], 
  () => ajax({
    url: `/api/polls/${pollId}`,
    data: { fullData: true }
  }), 
  options
)

export const usePresentation = (type, id, username, options = {}) => useQuery(
  ['presentation', type, id, username ], 
  () => ajax({
    url: '/api/users/presentation',
    data: { type, id, username }
  }), 
  options
)

export const useRecentPresentations = (type, id, options = {}) => useQuery(
  ['recentPresentations', { type, id }], 
  () => ajax({
    url: '/api/participations/recents',
    data: { type, id }
  }), 
  options
)