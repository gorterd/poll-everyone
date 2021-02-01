import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useDidUpdate, usePrevious, useStateValue } from '../util/custom_hooks'
import { exitModal } from '../store/actions/ui_actions'

export default () => {
  const curPath = useLocation().pathname
  const dispatch = useDispatch()
  
  const scrollY = useStateValue('ui scrollY')
  const modalType = useStateValue('modal type')
  const prevModalType = usePrevious(modalType)

  useEffect(() => {
    if (prevModalType && !modalType) window.scrollTo(0, scrollY)
  }, [modalType, prevModalType, scrollY])

  const onUpdate = useCallback(() => {
    curPath
    window.scrollTo(0, 0)
    dispatch(exitModal())
  }, [curPath, dispatch])

  useDidUpdate(onUpdate)
  
  return null
}