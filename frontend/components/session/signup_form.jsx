import React from 'react';
import { validEmail, validName, validPassword } from "../../util/validation_util";

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
  };

  submit(e) {
    e.preventDefault();
    this.props.signup(this.state)
      .then(() => this.props.history.push('./polls'));
  }

  handleInput(field) {
    return e => {
      const nextFormData = Object.assign({}, this.state.formData, { [field]: e.target.value });
      this.setState({ formData: nextFormData })
    }
  }

  validateInput(field) {
    return e => {
      if (!this.validations[field](e.target.value)) { 
        const newDisplayError = Object.assign({}, this.state.displayError, {[field]: true})
        this.setState({displayError: newDisplayError});
      }
    }
  }

  render() {

    const { displayError, formData } = this.state;

    const errorMessages = {
      firstName: <p>First name can't be blank</p>,
      lastName: <p>Last name can't be blank</p>, 
      password: <p>Your password needs to be at least 7 characters</p>,
      email: <><p>That doesn't look right.</p> <strong>We promise we won't sell your email address </strong></>
    }

    const errorDivs = {}

    for (let field in errorMessages){
      errorDivs[field] = displayError[field] ? <div className="signup-error">{errorMessages[field]}</div> : null
    }

    return (
      <>
        <h1>Presenter sign up</h1>
        <form onSubmit={this.submit}>

          <div className="signup-input-container">
            <input
                className={ displayError['firstName'] ? "error-input" : "" }
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={this.handleInput('firstName')}
                onBlur={this.validateInput('firstName')}
            />
            {errorDivs['firstName']}
          </div>

          <div className="signup-input-container">
            <input
                className={ displayError['lastName'] ? "error-input" : "" }
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={this.handleInput('lastName')}
                onBlur={this.validateInput('lastName')}
            />
            {errorDivs['lastName']}
          </div>

          <div className="signup-input-container">
            <input
                className={ displayError['email'] ? "error-input" : "" }
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={this.handleInput('email')}
                onBlur={this.validateInput('email')}
            />
            {errorDivs['email']}
          </div>

          <div className="signup-input-container">
            <input
                className={ displayError['password'] ? "error-input" : "" }
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={this.handleInput('password')}
                onBlur={this.validateInput('password')}
            />
            {errorDivs['password']}
          </div>

          <button type='submit'>Sign up</button>

        </form>
      </>
    )
  }
};

export default SignupForm;