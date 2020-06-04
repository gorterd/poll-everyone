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

    const { errorMsg, text, ...rest } = this.props;

    const errorEle = errorMsg ? <strong className="login-error-msg">{errorMsg}</strong> : null
    
    const smallLabel = this.state.focus ? <div className="small-input-label">{text}</div> : null
  
  
    return (
  
      <div className={"login-input-container" + (errorMsg ? " input-error" : "")}>
        <input 
          placeholder={text} 
          onFocus={this.handleFocus} 
          onBlur={this.handleLeave}
          {...rest}
        />
        {smallLabel}
        {errorEle}
      </div>
    )
  }
}

export default LoginInput;