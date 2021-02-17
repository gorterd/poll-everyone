import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLazyLoadQuery, useSubscribeToInvalidationState } from 'react-relay/hooks'
import { singleValueSelector } from '../util/redux_selectors'

// from react docs
export const usePrevious = value =>  {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export const useStateValue = propPath => 
  useSelector(singleValueSelector(propPath))

export const useFreshLazyLoadQuery = (query, vars = {}, options = {}) => {
  const [fetchKey, setFetchKey] = useState(query)
  const data = useLazyLoadQuery(query, vars, { ...options, fetchKey })
  const ids = Object.values(data).reduce((ids, val) => 
    [...ids, ...(val instanceof Array ? val.map(({ _id }) => _id) : [val._id])]
  )
  
  useSubscribeToInvalidationState(ids, () => setFetchKey(old => old + 1))
  return data
}