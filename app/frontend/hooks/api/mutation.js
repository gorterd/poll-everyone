import { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { RefetchPollsContext } from '../../components/app_state_wrapper'
import { clearSelections } from '../../store/actions/selection_actions'
import ajax from '../../util/ajax'

const useSession = (mutateFn, options = {}) => {
  const queryClient = useQueryClient()
  const { refetchPolls } = useContext(RefetchPollsContext)

  return useMutation(mutateFn, {
    ...options,
    onMutate: (...args) => {
      options.onMutate?.(queryClient, ...args)
    },
    onSuccess: (...args) => {
      options.onSuccess?.(queryClient, ...args)
      queryClient.invalidateQueries('current')
      refetchPolls()
    }
  })
}

export const checkIfUserExists = usernameOrEmail => (
  ajax({
    method: 'GET',
    url: '/api/session/exists',
    data: { query: usernameOrEmail },
  })
)

export const useLogin = () => {
  return useSession(user => (
    ajax({
      method: 'POST',
      url: '/api/session',
      data: { user }
    })
  ), {
    onSuccess: (queryClient, user) => {
      queryClient.setQueryData('current', () => user)
    }
  })
}

export const useSignup = () => {
  return useSession(user => (
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
}

export const useLogout = () => {
  return useSession(() => (
    ajax({
      method: 'DELETE',
      url: '/api/session',
    })
  ), {
    onSuccess: (queryClient) => {
      queryClient.setQueryData('current', () => ({}))
    }
  })
}

const useMutatePoll = (mutateFn, options = {}) => {
  const queryClient = useQueryClient()
  const { refetchPolls } = useContext(RefetchPollsContext)

  return useMutation(mutateFn, {
    ...options,
    onMutate: (...args) => {
      options.onMutate?.(queryClient, ...args)
    },
    onSuccess: (...args) => {
      options.onSuccess?.(queryClient, ...args)
      queryClient.invalidateQueries('polls')
      refetchPolls()
    }
  })
}

export const useCreatePoll = () => {
  return useMutatePoll(({ poll, groupId }) =>
    ajax({
      method: 'POST',
      url: `/api/groups/${groupId}/polls`,
      data: { poll }
    })
  )
}

export const useUpdatePoll = () => {
  return useMutatePoll(({ poll, pollId }) =>
    ajax({
      method: 'PATCH',
      url: `/api/polls/${pollId}`,
      data: { poll }
    })
  )
}

export const useDuplicatePoll = () => {
  return useMutatePoll(pollId =>
    ajax({
      method: 'POST',
      url: `/api/polls/${pollId}/duplicate`,
      data: { pollId }
    })
  )
}

export const useToggleActive = () => {

  return useMutatePoll(pollId => (
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
}

const useMutateGroup = (mutateFn, options = {}) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { refetchPolls } = useContext(RefetchPollsContext)

  return useMutation(mutateFn, {
    ...options,
    onMutate: () => {
      options.onMutate?.()
      dispatch(clearSelections())
    },
    onSuccess: () => {
      options.onSuccess?.()
      queryClient.invalidateQueries('polls')
      refetchPolls()
    }
  })
}

export const useCreateGroup = () => {
  return useMutateGroup(data =>
    ajax({
      method: 'POST',
      url: '/api/groups',
      data
    })
  )
}

export const useUpdateGroup = () => {
  return useMutateGroup(group =>
    ajax({
      method: 'PATCH',
      url: `/api/groups/${group._id}`,
      data: { group }
    })
  )
}

export const useBatchDestroy = () => {
  return useMutateGroup(selections =>
    ajax({
      method: 'DELETE',
      url: '/api/groups/batch_destroy',
      data: selections
    })
  )
}

export const useMovePolls = () => {
  return useMutateGroup(({ pollIds, groupId }) =>
    ajax({
      method: 'PATCH',
      url: `/api/groups/${groupId}/move_polls`,
      data: { pollIds }
    })
  )
}