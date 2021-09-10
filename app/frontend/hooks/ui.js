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

const useTransition = ({
  renderCondition,
  duration,
  enterDuration,
  exitDuration,
  interrupt = false,
  onEnter = () => { },
  afterEnter = () => { },
  onExit = () => { },
  afterExit = () => { },
}) => {
  enterDuration = enterDuration || duration
  exitDuration = exitDuration || duration

  const prevRenderCondition = usePrevious(renderCondition)
  const [renderState, setRenderState] = useState(renderCondition)
  const timeout = useRef()

  useDidUpdate(() => {
    if (
      prevRenderCondition === renderCondition
      || (timeout.current && !interrupt)
    ) return

    if (renderCondition) {
      setRenderState(true)
      onEnter()

      timeout.current = setTimeout(() => {
        afterEnter()
        timeout.current = null
      }, enterDuration)
    } else {
      onExit()

      timeout.current = setTimeout(() => {
        setRenderState(false)
        afterExit()
        timeout.current = null
      }, exitDuration)
    }
  })

  useEffect(() => () => clearTimeout(timeout.current), [])

  return renderState
}

export const useFade = (options) => {
  const transition = `opacity ${options.duration}ms`
  const fadedOut = { transition, opacity: 0 }
  const fadedIn = { transition, opacity: 1 }

  const [style, setStyle] = useState(fadedOut)
  const onEnter = () => setTimeout(() => setStyle(fadedIn), 20)
  const onExit = () => setStyle(fadedOut)

  const renderState = useTransition({ ...options, onEnter, onExit })

  return [renderState, style]
}

export const useAnimation = ({
  enterAnimation,
  exitAnimation,
  noFirstAnimation = false,
  ...options
}) => {
  const [style, setStyle] = useState(noFirstAnimation ? {} : enterAnimation)
  const [key, setKey] = useState(0)

  const onEnter = () => setStyle(enterAnimation)
  const onExit = () => {
    setKey(old => old + 1)
    setStyle(exitAnimation)
  }

  const renderState = useTransition({
    ...options,
    onEnter,
    onExit,
    enterDuration: enterAnimation.animationDuration,
    exitDuration: exitAnimation.animationDuration
  })

  return [renderState, style, key]
}