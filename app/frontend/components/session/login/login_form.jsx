import React from 'react';
import LoginInput from './login_input';
import {Link} from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullForm: false,
      formData: {
        usernameOrEmail: '',
        password: '',
      }
    }
    
    this.submit = this.submit.bind(this)
    this.next = this.next.bind(this)
    this.handleInput = this.handleInput.bind(this)
  };

  componentDidMount() {
    this.props.resetSessionErrors();
  }

  submit(e){
    e.preventDefault();
    this.props.login(this.state.formData)
      .then( () => this.props.history.push('./polls') );
  }

  next(e){
    e.preventDefault();
    this.props.checkIfUserExists(this.state.formData.usernameOrEmail)
      .then( () => this.setState({ fullForm: true}) );
  }
  
  handleInput(field){
    return e => {
      const nextFormData = Object.assign({}, this.state.formData, { [field]: e.target.value } );
      this.setState({ formData: nextFormData })
    }
  }

  render() {

    const { fullForm, formData: { usernameOrEmail, password }} = this.state;
    const errorMsg = this.props.sessionErrors[0];
    const { sessionIsLoading } = this.props;

    const form = fullForm ? (

      <form onSubmit={this.submit}>

        <LoginInput
          readOnly 
          tabIndex="-1" 
          text="Email or username"
          type="text"
          value={usernameOrEmail}
          onFocus={() => {
            this.props.resetSessionErrors();
            this.setState({fullForm: false})
          }
          }
        />

        <LoginInput
          autoFocus
          errorMsg={errorMsg}
          text="Password"
          type="password"
          value={password}
          onChange={this.handleInput('password')}
        />

        <button className='button button-red' type='submit' disabled={sessionIsLoading}>
          {sessionIsLoading ? "Logging in..." : "Log in"}</button>

      </form>

    ) : (

      <form onSubmit={this.next}>

        <LoginInput
          autoFocus
          errorMsg={errorMsg}
          text="Email or username"
          type="text"
          value={usernameOrEmail}
          onChange={this.handleInput('usernameOrEmail')}
        />
          

        <button className='button button-red' type='submit' disabled={sessionIsLoading}>
          {sessionIsLoading ? "Checking..." : "Next"}</button>

      </form>

    );

    return (
      <section className="login-form-section">
        <div className='login-form-container'>
          <h3>Log in</h3>
          {form}
          <div className="login-form-posttext">
            <p ><a>Forgot your password?</a></p>
            <p >Need an account? <Link className="login-link" to='/signup/splash'>Create one now</Link></p>
          </div>
        </div>
      </section>
    )
  }
};

export default LoginForm;