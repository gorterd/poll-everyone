import { isEqual } from 'lodash'
import { useCallback } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchQuery, useLazyLoadQuery, useRelayEnvironment } from 'react-relay/hooks'
import { singleValueSelector } from '../util/redux_selectors'

// from react docs
export const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export const useStateValue = propPath =>
  useSelector(singleValueSelector(propPath))

export const useStableMutable = (curMutable) => {
  const mutable = useRef(curMutable)
  if (!isEqual(mutable.current, curMutable)) {
    mutable.current = curMutable
  }
  return mutable.current
}

export const useRefetchableQuery = ({
  query,
  setRefetchQuery,
  variables = {},
  trackLoading = true
}) => {
  const env = useRelayEnvironment()
  const [loading, setLoading] = useState(false)
  const [queryOptions, setQueryOptions] = useState({})

  const refetch = useCallback((variables) => {
    if (trackLoading) setLoading(true)
    fetchQuery(env, query, variables).subscribe({
      complete: () => {
        if (trackLoading) setLoading(false)
        setQueryOptions(({ fetchKey = 0 }) => ({
          fetchKey: fetchKey + 1,
          fetchPolicy: 'store-only'
        }))
      },
      error: () => {
        if (trackLoading) setLoading(false)
      }
    })
  }, [trackLoading, env, query])

  useEffect(() => {
    setRefetchQuery?.(() => refetch)
    return () => setRefetchQuery?.(null)
  }, [setRefetchQuery, refetch])

  const data = useLazyLoadQuery(query, variables, queryOptions)
  return [data, loading, refetch]
}


