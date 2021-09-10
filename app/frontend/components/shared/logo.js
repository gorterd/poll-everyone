import React from 'react'
import { useHistory } from 'react-router-dom'
import logoImgUrl from '../../images/nav/logo.png'

export default function Logo({ path, onClick, text = 'Poll Everyone' }) {
  const history = useHistory()
  if (!onClick) onClick = () => history.push(path || '/')

  return (
    <button onClick={onClick} className='logo'>
      <img src={logoImgUrl} alt='Logo' />
      <span>{text}</span>
    </button>
  )
}