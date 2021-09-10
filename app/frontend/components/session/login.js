import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginInput from './login/login_input'
import { useInputState } from '../../hooks/state'
import { useLogin, useDemoLogin } from '../../hooks/api/mutation'
import { checkIfUserExists } from '../../util/ajax'

export default function Login() {
  const { mutate: login } = useLogin()
  const { mutate: demoLogin } = useDemoLogin()
  const [usernameOrEmail, usernameInputProps] = useInputState()
  const [
    password,
    passwordInputProps,
    { setValue: setPassword }
  ] = useInputState('')
  const [fullForm, setFullForm] = useState(false)
  const [sessionLoading, setSessionLoading] = useState(false)
  const [error, setError] = useState('')

  const formStep = ({ request, success }, e) => {
    e.preventDefault()
    setSessionLoading(true)

    request()
      .finally(() => setSessionLoading(false))
      .then(success, e => setError(e[0]))
  }

  const submit = formStep.bind(null, {
    request: () => login({ usernameOrEmail, password }),
  })

  const next = formStep.bind(null, {
    request: () => checkIfUserExists(usernameOrEmail),
    success: () => {
      setFullForm(true)
      setError('')
    }
  })

  const otherUsernameProps = fullForm
    ? {
      readOnly: true,
      tabIndex: '-1',
      onFocus: () => {
        setError('')
        setPassword('')
        setFullForm(false)
      }
    }
    : {
      autoFocus: true,
      errorMsg: error,
    }

  const buttonText = fullForm
    ? sessionLoading
      ? 'Logging in...'
      : 'Log in'
    : sessionLoading
      ? 'Checking...'
      : 'Next'

  return (
    <section className="login-form-section">
      <div className='login-form-container'>
        <h3>Log in</h3>
        <form onSubmit={fullForm ? submit : next}>
          <LoginInput
            text="Email or username"
            {...usernameInputProps}
            {...otherUsernameProps}
          />

          {fullForm && (
            <LoginInput
              {...passwordInputProps}
              autoFocus
              errorMsg={error}
              text="Password"
              type="password"
            />
          )}

          <button
            className='button button-red'
            type='submit'
            disabled={sessionLoading}
          >{buttonText}</button>
        </form>

        <div className="login-form-posttext">
          <p>Need an account?
            <Link className="login-link" to='/signup/splash'>
              Create one now
            </Link>
            or
            <span className="login-link" onClick={() => demoLogin()}>
              Login as a demo user
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}