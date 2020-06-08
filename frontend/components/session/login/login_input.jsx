import React from 'react';
import LargeInput from '../../shared/large-animated-input';

const PasswordButton = ({clickHandler}) => {
  return (
    <span className='view-password-button' onClick={clickHandler}>
      <i className="fas fa-eye"></i>
    </span>
  )
}

class LoginInput extends React.Component {
    constructor(props){
      super(props);
      this.state = { curType: this.props.type };

      this.togglePasswordVisible = this.togglePasswordVisible.bind(this);
    }

    togglePasswordVisible(){
      const newType = ((this.state.curType === 'text') ? 'password' : 'text'); 
      this.setState({curType: newType});
      debugger;
    }

    render(){
      const { type, completed, ...rest } = this.props;

      const rightSideComponents = (type === 'password') ? 
        <PasswordButton clickHandler={this.togglePasswordVisible} /> : null;

      const inputProps = {
        errorConditions: !completed,
        klass: 'login-input-container',
      }

      return <LargeInput {...inputProps} {...rest} type={this.state.curType} rightSideComponents={rightSideComponents} />
    }
}

export default LoginInput;



  // constructor(props){
  //   super(props);

  //   this.state = { focus: false, curType: this.props.type }

  //   this.handleFocus = this.handleFocus.bind(this)
  //   this.handleLeave = this.handleLeave.bind(this)
  //   this.togglePasswordVisible = this.togglePasswordVisible.bind(this)
  // }

  // handleFocus(e){
  //   this.setState({ focus: true })
  // }

  // handleLeave(e){
  //   this.setState({ focus: false})
  // }

  // togglePasswordVisible(){
  //   const newType = (this.state.curType === 'text') ? 'password' : 'text'; 
  //   this.setState({curType: newType})
  // }

  // render(){

  //   const { errorMsg, type, text, value, completed, ...rest } = this.props;
  //   const activated = Boolean(value || this.state.focus);
  //   const erroredOut = Boolean(errorMsg && !completed);

  //   const errorEle = erroredOut ? <div className="login-error-msg">{errorMsg}</div> : null
  //   const passwordButton = (type === 'password') ? (
  //     <span className='view-password-button' onClick={this.togglePasswordVisible}>
  //       <i className="fas fa-eye"></i>
  //     </span>
  //   ) : null

  //   const upAndIn = {
  //     animationName: "slide-up-and-in",
  //     animationDuration: "200ms",
  //     animationIterationCount: 1,
  //     animationTimingFunction: "ease-out",
  //   };

  //   const downAndOut = {
  //     animationName: "slide-down-and-out",
  //     animationDuration: "200ms",
  //     animationIterationCount: 1,
  //     animationTimingFunction: "ease-in",
  //   };

  //   return (

  //     <div className={"login-input-container" + (erroredOut ? " input-error" : "")}>
  //       <div className={"login-input-wrapper" + ( activated ? " activated" : "")}>
  //         <input 
  //           className={activated ? " activated" : ""}
  //           onFocus={this.handleFocus} 
  //           onBlur={this.handleLeave}
  //           type={this.state.curType}
  //           {...rest}
  //           />
  //         <div className="small-input-label-container">
  //           <Animated
  //             renderCondition={activated}
  //             enterAnimation={upAndIn}
  //             exitAnimation={downAndOut} 
  //             ><div className="small-input-label">{text}</div>
  //           </Animated>
  //         </div>
  //         <div className="placeholder-input-label-container">
  //           <Animated
  //             renderCondition={!activated}
  //             enterAnimation={upAndIn}
  //             ><div className="placeholder-input-label">{text}</div>
  //           </Animated>
  //         </div>
  //         {passwordButton}
  //       </div>
  //       {errorEle}
  //     </div>
  //   )
  // }