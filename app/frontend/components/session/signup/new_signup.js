import React, { useState } from 'react'
import { validEmail, validName, validPassword } from '../../../util/validation_util'
import SignupInput from './signup_input'
import AttributedImage from '../../shared/attributed_image'
import signupSplashImg from '../../../images/splash/signup-splash-02.png'
import { useObjectState } from '../../../util/custom_hooks'
import { useSignup } from '../../../util/api/mutation_hooks'
import { useHistory } from 'react-router-dom'
import { objMap, hasTruthyValue } from '../../../util/general_util'

const validations = {
  firstName: validName,
  lastName: validName,
  email: validEmail,
  password: validPassword,
  terms: checked => checked,
}

const nullErrors = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  terms: false,
}

const nullFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  terms: false,
}

export default function Signup () {
  const history = useHistory()
  const { mutateAsync: signup } = useSignup()
  const [formData, setFormData] = useObjectState(nullFormData)
  const [ errors, setErrors ] = useObjectState(nullErrors)
  const [ backendErrors, setBackendErrors ] = useState([])
  const [ sessionLoading, setSessionLoading ] = useState(false)

  const getEventValue = (field, e) => field === 'terms'
    ? e.target.checked
    : e.target.value

  const isValid = (field, value) => validations[field](value) 

  const submit = e => {
    e.preventDefault()
    const newErrors = objMap(formData, ([field, val]) => !isValid(field, val))

    if (hasTruthyValue(newErrors)) {
      setErrors(newErrors, true)
    } else {
      setSessionLoading(true)
      signup(formData)
        .finally(() => setSessionLoading(false) )
        .then( 
          () => history.push('/polls'),
          e => setBackendErrors(e)
        )
    }
  }

  const handleChange = field => e => {
    const value = getEventValue(field, e)

    setFormData({ [field]: value })
    setErrors( oldErrors => (
      oldErrors[field] && isValid(field, value)
        ? { [field]: false }
        : {}
    ))
  }

  const handleBlur = field => e => {
    const value = getEventValue(field, e)
    setErrors({ [field]: !isValid(field, value) })
  }

  const inputs = Object.keys(nullFormData).map( field => (
    <SignupInput 
      key={field}
      field={field}
      displayError={errors[field]}
      value={formData[field]}
      onChange={handleChange(field)}
      onBlur={handleBlur(field)}
    />
  )) 

  const sessionErrorsDiv = backendErrors.length > 0 && (
    <div className="session-errors-container">
      <h2>Uh oh! Couldn't make that account for ya.</h2>
        There were problems with the following fields:
      <div className="session-errors">
        {backendErrors}
      </div>
    </div> 
  )

  return (
    <section className='signup signup-form-container' >
      <div className="signup-div-left">
        <div className="signup-div-text">
          <h1>Presenter sign up</h1>

          <form onSubmit={submit} className="signup-form">
            {sessionErrorsDiv}
            {inputs}
            <button
              type='submit'
              className="button button-blue"
              disabled={ sessionLoading || hasTruthyValue(errors) }
            >{sessionLoading ? 'Signing up...' : 'Sign up'}</button>
          </form>
        </div>
      </div>

      <div className="signup-div-right">
        <AttributedImage
          id="signup-form-img"
          src={signupSplashImg}
          alt={'Person Looking at Charts'}
          imgClass="signup-splash-img"
          iconClass="icon-dark"
        >
          <a href="https://stories.freepik.com/illustration/setup-analytics/rafiki#FF725EFF">Illustration vector created by stories - stories.freepik.com</a>
        </AttributedImage>
      </div>
    </section >
  )
}