import React from 'react'
import { classNames } from '../../../util/general_util'

const staticProps = {
  firstName: {
    type: 'text',
    text: 'First name',
    placeholder: 'First name'
  },
  lastName: {
    type: 'text',
    text: 'Last name',
    placeholder: 'Last name'
  },
  email: {
    type: 'text',
    text: 'Email',
    placeholder: 'Email'
  },
  password: {
    type: 'password',
    text: 'Password',
    placeholder: 'Password'
  },
  terms: {
    type: 'checkbox',
    text: 'Agree to the nonexistent Terms and Conditions',
    id: 'terms-checkbox'
  },
}

const errorMessages = {
  firstName: <p className="error-message">First name can't be blank</p>,
  lastName: <p className="error-message">Last name can't be blank</p>,
  password: (
    <p className="error-message">
      Your password needs to be at least 7 characters
    </p>
  ),
  email: (
    <>
      <p className="error-message">That doesn't look right.</p>
      <strong>(We won't spam you.)</strong>
    </>
  ),
  terms: <p className="error-message">They're not optional, buddy</p>
}

const SignupInput = ({
  field,
  displayError,
  ...rest
}) => (
  <div className="signup-input-container">
    <input
      {...classNames('signup-input', [displayError, 'signup-input-error'])}
      {...rest}
      {...staticProps[field]}
    />

    { staticProps[field].type === 'checkbox' && (
      <label>{staticProps[field].text}</label>
    )}
    
    { displayError && (
      <div className="signup-error">
        <div className="error-triangle-outline"></div>
        <div className="error-triangle-fill"></div>
        {errorMessages[field]}
      </div>
    )}
  </div>
)

export default SignupInput