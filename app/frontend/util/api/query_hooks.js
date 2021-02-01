import { useQuery, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { currentUserIdSelector } from '../hooks_selectors'
import ajax from './ajax'

export const useCurrentUser = (options = {}) => 
  useQuery('currentUser', () =>
    ajax({
      method: 'GET',
      url: '/api/users/current'
    }), options
  )

export const usePresentation = (type, id, username, options = {}) => {
  return useQuery(['presentation', { type, id, username }], () => 
    ajax({
      method: 'GET',
      url: '/api/users/presentation',
      data: { type, id, username }
    }), options
  )
}

export const useRecentPresentations = (type, id, options = {}) => {
  return useQuery(['recentPresentations', { type, id }], () =>
    ajax({
      method: 'GET',
      url: '/api/participants/recents',
      data: { type, id }
    }), options
  )
}

export const usePoll = (pollId, options = {}) => {
  return useQuery(['polls', pollId], () =>
    ajax({
      method: 'GET',
      url: `/api/polls/${pollId}`,
      data: { fullData: true }
    }), options
  )
}


export function usePollData(options = {}) {
  const currentId = useSelector(currentUserIdSelector)
  return useQuery('polls', 
    () => ajax({ url: `/api/users/${currentId}/groups` }),
    {
      initialData: { groups: {}, polls: {} },
      ...options
    }
  )
}

export function useCachedPollData(options = {}) {
  const client = useQueryClient()
  return client.getQueryData('polls', { exact: true, ...options })
}