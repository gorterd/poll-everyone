import { useEffect, useRef, useCallback } from 'react'
import { useStateValue } from './general'

export const useDidUpdate = cb => {
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
    } else {
      return cb()
    }
  }, [cb])
}

// wait to fetch non-urgent resources until urgent requests are complete and 
// app is no longer suspensed
export const useDelayedPrefetch = fetchCb => {
  const componentLoading = useStateValue('ui componentLoading')
  const ref = useRef({ status: 'START', value: null })

  const fetch = useCallback(() => {
    fetchCb()
    ref.current.status = null
  }, [fetchCb])

  useEffect(() => {
    switch (ref.current.status) {
      case 'START':
        ref.current.status = 'TIMEOUT'
        window.setTimeout(() => {
          if (ref.current.value) {
            ref.current.status = 'CHECK'
          } else {
            fetch()
          }
        }, 100)
      // fallthrough
      case 'TIMEOUT':
        ref.current.value = componentLoading
        break
      case 'CHECK':
        if (!componentLoading) {
          fetch()
          ref.current.status = null
        }
    }
  }, [componentLoading, fetch])
}