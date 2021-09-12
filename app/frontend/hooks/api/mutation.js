import { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FetchPollsContext } from '../../components/app_state_wrapper'
import { clearSelections } from '../../store/actions/selection_actions'
import ajax from '../../util/ajax'

const useHybridMutation = (mutateFn, {
  key,
  onMutate,
  onSuccess,
  ...options
} = {}) => {
  const { fetchQuery } = useContext(FetchPollsContext)
  const queryClient = useQueryClient()

  return useMutation(mutateFn, {
    ...options,
    onMutate: (...args) => {
      onMutate?.(queryClient, ...args)
    },
    onSuccess: (...args) => {
      onSuccess?.(queryClient, ...args)
      if (key) queryClient.invalidateQueries(key)
      fetchQuery()
    }
  })
}

const useMutateSession = (mf, opts = {}) =>
  useHybridMutation(mf, { key: 'current', ...opts })

const useMutatePoll = (mf, opts = {}) =>
  useHybridMutation(mf, { key: 'polls', ...opts })

const useMutateGroup = (mf, { onMutate, ...opts } = {}) => {
  const dispatch = useDispatch()
  return useHybridMutation(mf, {
    key: 'polls',
    ...opts,
    onMutate: (...args) => {
      dispatch(clearSelections())
      onMutate?.(...args)
    }
  })
}

export const useLogin = (boundUser) => {
  const history = useHistory()

  return useMutateSession((user = boundUser) => (
    ajax({
      method: 'POST',
      url: '/api/session',
      data: { user }
    })
  ), {
    onSuccess: (queryClient, user) => {
      queryClient.setQueryData('current', () => user)
      history.push('/polls')
    }
  })
}

export const useDemoLogin = () => useLogin({
  usernameOrEmail: 'Truman123',
  password: 'simulation'
})

export const useSignup = () => useMutateSession(user => (
  ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  })
), {
  onSuccess: (queryClient, user) => {
    queryClient.setQueryData('current', () => user)
  }
})

export const useLogout = () => useMutateSession(() => (
  ajax({
    method: 'DELETE',
    url: '/api/session',
  })
), {
  onSuccess: (queryClient) => {
    queryClient.setQueryData('current', () => ({}))
  }
})

export const useCreatePoll = () => useMutatePoll(({ poll, groupId }) =>
  ajax({
    method: 'POST',
    url: `/api/groups/${groupId}/polls`,
    data: { poll }
  })
)

export const useUpdatePoll = () => useMutatePoll(({ poll, pollId }) =>
  ajax({
    method: 'PATCH',
    url: `/api/polls/${pollId}`,
    data: { poll }
  })
)

export const useDuplicatePoll = () => useMutatePoll(pollId =>
  ajax({
    method: 'POST',
    url: `/api/polls/${pollId}/duplicate`,
    data: { pollId }
  })
)

export const useToggleActive = () => useMutatePoll(pollId => (
  ajax({
    method: 'PATCH',
    url: `/api/polls/${pollId}/toggle_activation`,
  })
), {
  onMutate: (queryClient, pollId) => {
    queryClient.setQueryData(['polls', pollId], oldData => {
      if (!oldData) return
      const { poll } = oldData
      const newPoll = { ...poll, active: !poll.active }
      return { ...oldData, poll: newPoll }
    })

    queryClient.setQueryData('polls', oldData => {
      if (!oldData) return
      const { polls } = oldData
      const poll = polls[pollId]
      const newPoll = { ...poll, active: !poll.active }
      return { ...oldData, polls: { ...polls, [pollId]: newPoll } }
    })
  }
})

export const useCreateGroup = () => useMutateGroup(data =>
  ajax({
    method: 'POST',
    url: '/api/groups',
    data
  })
)

export const useUpdateGroup = () => useMutateGroup(group =>
  ajax({
    method: 'PATCH',
    url: `/api/groups/${group._id}`,
    data: { group }
  })
)

export const useBatchDestroy = () => useMutateGroup(selections =>
  ajax({
    method: 'DELETE',
    url: '/api/groups/batch_destroy',
    data: selections
  })
)

export const useMovePolls = () => useMutateGroup(({ pollIds, groupId }) =>
  ajax({
    method: 'PATCH',
    url: `/api/groups/${groupId}/move_polls`,
    data: { pollIds }
  })
)
