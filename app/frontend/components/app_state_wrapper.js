/* eslint-disable no-undef */
import React, {
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState
} from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { useStateValue, usePrevious } from '../hooks/general'
import { exitModal } from '../store/actions/ui_actions'
import { useRelayEnvironment, fetchQuery } from 'react-relay/hooks'
import { pollsIndexQuery } from './polls/polls_index'

export const FetchPollsContext = createContext()

export default function AppStateWrapper({ children }) {
  const [isFrozen, offset] = useScrollRestoration()
  const pollsFetcher = useQueryFetch(pollsIndexQuery)

  return (
    <div
      className={'app' + (isFrozen ? ' freeze-scroll' : '')}
      style={isFrozen ? { top: offset } : null}
    >
      <FetchPollsContext.Provider value={pollsFetcher}>
        {children}
      </FetchPollsContext.Provider>
    </div>
  )
}

function useScrollRestoration() {
  const scrollY = useStateValue('ui scrollY')
  const modalActive = useStateValue('modal type')
  const prevModalActive = usePrevious(modalActive)
  const modalClosed = prevModalActive && !modalActive

  useLayoutEffect(() => {
    if (modalClosed) window.scrollTo(0, scrollY)
  }, [modalClosed, scrollY])


  const curPath = useLocation().pathname
  const prevPath = usePrevious(curPath)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (prevPath !== curPath) {
      window.scrollTo(0, 0)
      if (modalActive) dispatch(exitModal())
    }
  }, [curPath, prevPath, modalActive, dispatch])

  return [modalActive, scrollY * -1]
}

function useQueryFetch(query) {
  const env = useRelayEnvironment()
  const [refetchQuery, setRefetchQuery] = useState()

  const fetch = useCallback((variables) => {
    if (refetchQuery) {
      refetchQuery(variables)
    } else {
      fetchQuery(env, query, variables || {}).toPromise()
    }
  }, [env, refetchQuery, query])

  return useMemo(
    () => ({ fetchQuery: fetch, setRefetchQuery }),
    [fetch, setRefetchQuery]
  )
}