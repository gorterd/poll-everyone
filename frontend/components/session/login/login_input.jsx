import React from 'react';

class LoginInput extends React.Component {

  constructor(props){
    super(props);

    this.state = { focus: false, curType: this.props.type }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
    this.togglePasswordVisible = this.togglePasswordVisible.bind(this)
  }

  handleFocus(e){
    this.setState({ focus: true })
  }

  handleLeave(e){
    this.setState({ focus: false})
  }

  togglePasswordVisible(){
    const newType = (this.state.curType === 'text') ? 'password' : 'text'; 
    this.setState({curType: newType})
  }

  render(){

    const { errorMsg, type, text, value, completed, ...rest } = this.props;
    const activated = Boolean(value || this.state.focus);
    const erroredOut = Boolean(errorMsg && !completed);

    const errorEle = erroredOut ? <div className="login-error-msg">{errorMsg}</div> : null
    const smallLabel =  activated ? <div className="small-input-label">{text}</div> : null
    const passwordButton = (type === 'password') ? (
      <span className='view-password-button' onClick={this.togglePasswordVisible}>
        <i class="fas fa-eye"></i>
      </span>
    ) : null

    return (
  
      <div className={"login-input-container" + (erroredOut ? " input-error" : "")}>
        <div className={"login-input-wrapper" + ( activated ? " activated" : "")}>
          <input 
            placeholder={ activated || completed ? null : text} 
            onFocus={this.handleFocus} 
            onBlur={this.handleLeave}
            type={this.state.curType}
            {...rest}
          />
          {passwordButton}
          {smallLabel}
        </div>
        {errorEle}
      </div>
    )
  }
}

export default LoginInput;