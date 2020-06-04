import React from 'react';

class LoginInput extends React.Component {

  constructor(props){
    super(props);

    this.state = { focus: false }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
  }

  handleFocus(e){
    this.setState({ focus: true })
  }

  handleLeave(e){
    this.setState({ focus: false})
  }

  render(){

    const { errorMsg, text, value, completed, ...rest } = this.props;
    const activated = Boolean(value || this.state.focus);
    const erroredOut = Boolean(errorMsg && !completed);

    const errorEle = erroredOut ? <div className="login-error-msg">{errorMsg}</div> : null
    const smallLabel =  activated ? <div className="small-input-label">{text}</div> : null

    return (
  
      <div className={"login-input-container" + (erroredOut ? " input-error" : "")}>
        <div className={"login-input-wrapper" + ( activated ? " activated" : "")}>
          <input 
            placeholder={ activated || completed ? null : text} 
            onFocus={this.handleFocus} 
            onBlur={this.handleLeave}
            {...rest}
          />
          {smallLabel}
        </div>
        {errorEle}
      </div>
    )
  }
}

export default LoginInput;