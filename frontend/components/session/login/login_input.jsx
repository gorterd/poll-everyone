import React from 'react';
import LargeInput from '../../shared/large-animated-input';

const PasswordButton = ({type, clickHandler}) => {
  return (type === 'password') ? (
    <span className='view-password-button' onClick={clickHandler}>
      <i className="fas fa-eye"></i>
    </span> ) : null;
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

      const inputProps = {
        errorConditions: !completed,
        klass: 'login-input-container',
      }

      return <LargeInput {...inputProps} {...rest} type={this.state.curType} 
        rightSide={PasswordButton} rightSideProps={ { type: type, clickHandler: this.togglePasswordVisible} }/>
    }
}

export default LoginInput;

