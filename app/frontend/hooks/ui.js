import { 
  useRef, 
  useState, 
  useLayoutEffect, 
  useEffect, 
  useCallback, 
  useMemo 
} from 'react'
import { useDidUpdate } from './effect'
import { usePrevious } from './general'

export const useDropdown = documentClickCb => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const eventHandlers = useMemo(() => ({
    hideDropdown: () => setDropdownVisible(false),
    showDropdown: () => setDropdownVisible(true),
    toggleDropdown: () => setDropdownVisible(old => !old),
  }), [])

  const dropdownRef = useRef()
  const listener = useCallback(e => {
    if (!dropdownRef.current.contains(e.target)) {
      eventHandlers.hideDropdown()
      documentClickCb?.()
    }
  }, [documentClickCb, eventHandlers])

  useLayoutEffect(() => {
    if (dropdownVisible) {
      document.addEventListener('click', listener, true)
      return () => document.removeEventListener('click', listener, true)
    }
  }, [dropdownVisible, listener])

  return [dropdownVisible, dropdownRef, eventHandlers]
}

export const useAnimation = ({
  renderCondition,
  enterAnimation,
  exitAnimation,
  interruptAnimation = false,
  noFirstAnimation = false,
  afterEnter = () => { },
  afterExit = () => { },
}) => {
  if (typeof renderCondition === 'undefined') {
    throw new Error('Must provide a renderCondition')
  }

  const enterDuration = enterAnimation?.animationDuration
  const exitDuration = exitAnimation?.animationDuration

  if (enterAnimation && !enterDuration) {
    throw new Error('enterAnimation must have animationDuration')
  }

  if (exitAnimation && !exitDuration) {
    throw new Error('exitAnimation must have animationDuration')
  }

  enterAnimation = enterAnimation || { animationDuration: 0 }
  exitAnimation = exitAnimation || { animationDuration: 0 }
  
  const prevRenderCondition = usePrevious(renderCondition)
  const [renderState, setRenderState] = useState(renderCondition)
  const [style, setStyle] = useState(noFirstAnimation ? {} : enterAnimation)
  const [key, setKey] = useState(0)
  const timeout = useRef()

  useDidUpdate(() => {
    if (prevRenderCondition === renderCondition) return

    if (timeout.current && !interruptAnimation) return
    clearTimeout(timeout.current)

    if (renderCondition) {
      setRenderState(true)
      setStyle(enterAnimation)

      timeout.current = window.setTimeout(() => {
        afterEnter()
        timeout.current = null
      }, parseInt(enterDuration))
    } else {
      setKey(old => old + 1)
      setStyle(exitAnimation)

      timeout.current = window.setTimeout(() => {
        setRenderState(false)
        afterExit()
        timeout.current = null
      }, parseInt(exitDuration))
    }
  })

  useEffect(() => () => clearTimeout(timeout.current), [])

  return [renderState, style, key]
}
