/* eslint-disable no-undef */
import React, { createContext, useLayoutEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useLocation } from 'react-router-dom'

import { useStateValue, usePrevious } from '../hooks/general'
import { exitModal } from '../store/actions/ui_actions'

export const RefetchPollsContext = createContext()

export default function AppStateWrapper({ children }) {
  const [isFrozen, offset] = useScrollRestoration()
  const [refetchPolls, setRefetchPolls] = useState(() => () => { })
  const refetchPollsValue = useMemo(
    () => ({ refetchPolls, setRefetchPolls }),
    [refetchPolls, setRefetchPolls]
  )

  return (
    <div
      className={'app' + (isFrozen ? ' freeze-scroll' : '')}
      style={isFrozen ? { top: offset } : null}
    >
      <RefetchPollsContext.Provider value={refetchPollsValue}>
        {children}
        {process.env.NODE_ENV !== 'production' &&
          <ReactQueryDevtools initialIsOpen={false} />
        }
      </RefetchPollsContext.Provider>
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