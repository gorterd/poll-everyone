import React from 'react';
import LoginInput from './login_input';

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

    const form = fullForm ? (

      <form onSubmit={this.submit}>

        <label htmlFor="usernameOrEmail">Username or Email Address</label>
        <input 
          readOnly 
          tabIndex="-1" 
          type="text" 
          id="usernameOrEmail" 
          value={usernameOrEmail} 
          onFocus={() => this.setState({fullForm: false})}
        />

        <div className={ errorMsg ? "error" : "" }>
          <label htmlFor="password">Password</label>
          <input 
            autoFocus 
            type="password" 
            id="password" 
            value={password} 
            onChange={this.handleInput('password')}
          />
          {errorMsg}
        </div>

        <button type='submit'>Log in</button>

      </form>

    ) : (

      <form onSubmit={this.next}>

        {/* <div className={errorMsg ? "error" : ""}>
          <label htmlFor="usernameOrEmail">Username or Email Address</label>
          <input 
            type="text" 
            id="usernameOrEmail" 
            value={usernameOrEmail} 
            onChange={this.handleInput('usernameOrEmail')}
            />
          {errorMsg}
        </div> */}

        <LoginInput
          errorMsg={errorMsg}
          text="Email or username"
          type="text"
          value={usernameOrEmail}
          onChange={this.handleInput('usernameOrEmail')}
        />
          

        <button type='submit'>Next</button>

      </form>

    );

    return (
      <section className="login-form-section">
        <h3>Log in</h3>
        {form}
      </section>
    )
  }
};

export default LoginForm;