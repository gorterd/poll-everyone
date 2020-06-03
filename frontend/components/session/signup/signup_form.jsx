import React from 'react';
import { validEmail, validName, validPassword } from "../../../util/validation_util";
import SignupInput from './signup_input';

class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      displayError: {
        firstName: false,
        lastName: false,
        email: false,
        password: false
      }
    }

    this.validations = {
      firstName: validName,
      lastName: validName,
      email: validEmail,
      password: validPassword,
    }

    this.submit = this.submit.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.validateInput = this.validateInput.bind(this)
    this.isError = this.isError.bind(this)
  };

  submit(e) {
    e.preventDefault();
     
    this.props.signup(this.state.formData)
      .then(() => this.props.history.push('/polls'));
  }

  handleInput(field) {
    return e => {
      const nextFormData = Object.assign({}, this.state.formData, { [field]: e.target.value });
      this.setState({ formData: nextFormData })
    }
  }
  
  validateInput(field) {
    return e => {
      const isValid = this.validations[field](e.target.value);
      const newDisplayError = Object.assign({}, this.state.displayError, {[field]: !isValid})
      this.setState({displayError: newDisplayError});
    }
  }
  
  isError() {
    return Object.values(this.state.displayError).some( bool => bool );
  }

  render() {

    const { displayError, formData } = this.state;

    const errorMessages = {
      firstName: <p className="error-message">First name can't be blank</p>,
      lastName: <p className="error-message">Last name can't be blank</p>, 
      password: <p className="error-message">Your password needs to be at least 7 characters</p>,
      email: <><p className="error-message">That doesn't look right.</p> <strong>(We won't spam you.)</strong></>
    }

    const inputProps = { 
      displayError, 
      formData, 
      errorMessages,
      handleInput: this.handleInput,  
      validateInput: this.validateInput,  
    }


    return (
      <section className='signup signup-form-container' >
        <div className="signup-div-left">
          <div className="signup-div-text">
            <h1>Presenter sign up</h1>



            <form onSubmit={this.submit} className="signup-form">

              <SignupInput type='text' field='firstName' text='First name' {...inputProps} />
              <SignupInput type='text' field='lastName' text='Last name' {...inputProps} />
              <SignupInput type='text' field='email' text='Email' {...inputProps} />
              <SignupInput type='password' field='password' text='Password' {...inputProps} />

              <button type='submit' className="button button-blue" disabled={this.isError()} >Sign up </button>

            </form>

          </div>
        </div>
        <div className="signup-div-right"></div>
      </section >
    )

    
  }
};

export default SignupForm;