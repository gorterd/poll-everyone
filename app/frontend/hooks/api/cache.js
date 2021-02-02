import { useQueryClient } from 'react-query'

export const useCachedPollData = (options = {}) => {
  const client = useQueryClient()
  return client.getQueryData('polls', { exact: true, ...options })
}
