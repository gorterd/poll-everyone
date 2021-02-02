import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
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