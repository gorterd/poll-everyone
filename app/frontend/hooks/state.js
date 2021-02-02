import { merge } from 'lodash'
import { useState, useCallback } from 'react'


export function useObjectState(initState) {
  const [state, setState] = useState(initState)

  const mergeSetState = useCallback((newStateOrUpdaterFn, mutate = false) => {
    switch (typeof newStateOrUpdaterFn) {
      case 'function':
        if (mutate) {
          return setState(oldState => {
            const newState = merge({}, oldState)
            newStateOrUpdaterFn(newState)
            return newState
          })
        } else {
          return setState(oldState => {
            const newState = newStateOrUpdaterFn(oldState)
            return merge({}, oldState, newState)
          })
        }
      case 'object':
        if (mutate) {
          return setState(newStateOrUpdaterFn)
        } else {
          return setState(oldState => merge({}, oldState, newStateOrUpdaterFn))
        }
      default:
        throw new Error('argument to `mergeSetState` must be object or function')
    }
  }, [])

  return [state, mergeSetState]
}

export function useToggleState(initVal) {
  const [val, setVal] = useState(initVal)
  const toggleVal = () => setVal(old => !old)
  return [val, toggleVal]
}

export function useInputState(defaultVal, props = {}) {
  const [value, setValue] = useState(defaultVal)

  const inputProps = {
    onChange: event => setValue(event.target.value),
    value,
    ...props
  }

  return [value, inputProps, setValue]
}

