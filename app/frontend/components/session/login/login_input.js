import React, { useState } from 'react'
import LargeInput from '../../shared/large_input'

const PasswordButton = ({ onClick }) => (
  <span className='view-password-button' onClick={onClick}>
    <i className="fas fa-eye"></i>
  </span>
)

export default function LoginInput({ type, ...rest }) {
  const [ curType, setCurType ] = useState(type)
  const toggleType = () => setCurType( 
    curType === 'password' 
      ? 'text'
      : 'password'
  )

  return (
    <LargeInput
      klass='login-input-container'
      type={curType}
      rightSide={ type === 'password' && PasswordButton }
      rightSideProps={{ onClick: toggleType }}
      {...rest}
    />
  )
}