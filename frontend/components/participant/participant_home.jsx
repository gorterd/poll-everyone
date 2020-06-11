import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkIfUserExists, resetSessionErrors } from "../../actions/session_actions";


class ParticipantHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  };

  componentDidMount(){
    this.props.resetSessionErrors();
  }

  handleChange(e){
    this.props.resetSessionErrors();
    this.setState({ username: e.target.value })
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.checkIfUserExists(this.state.username).then( () => {
      this.props.history.push(`/participate/${this.state.username}`);
    });
  }

  render() {
    const validUsername = /^[a-zA-Z0-9]*$/
    
    let errorMsg;
    if (!validUsername.test(this.state.username)){
      errorMsg = 'Username can only include letters or numbers';
    } else {
      errorMsg = this.props.sessionErrors[0] ? 'Presenter not found' : null;
    }

    return (
      <div className='participant-home'>
        <div className='participant-home-logo'>
          <img src={window.logoAltURL} alt='Logo' />
          <span> Poll Everyone</span>
        </div>
        <div className='participant-join-form-container'>
          <h2>Join presentation</h2>
          <form onSubmit={this.handleSubmit}>
            <div className={`participant-join-input-container ${(errorMsg ? "input-error" : "")}`}>
              <div className={"participant-join-input-wrapper"}>
                <span>#/participate/</span>
                <input
                  autoFocus
                  className='participant-join-input'
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.username}
                  placeholder='username'
                />
              </div>
              {errorMsg ? <div className="large-input-error-msg">{errorMsg}</div> : null}
            </div>
            <button type='submit' className='button-blue' disabled={errorMsg || !this.state.username}>Join</button>
          </form>
        </div>
      </div>
    )
  }
};

const mapState = state => {
  return {
    sessionErrors: state.errors.session,
    sessionIsLoading: state.ui.sessionLoading,
  }
}

const mapDispatch = dispatch => {
  return {
    resetSessionErrors: () => dispatch(resetSessionErrors()),
    checkIfUserExists: usernameOrEmail => dispatch(checkIfUserExists(usernameOrEmail)),
  }
}

export default withRouter(connect(mapState, mapDispatch)(ParticipantHome));