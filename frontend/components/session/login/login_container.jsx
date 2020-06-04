import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { checkIfUserExists, login, resetSessionErrors } from "../../../actions/session_actions";
import LoginForm from './login_form';

const mapState = state => {
  return {
    sessionErrors: state.errors.session,  
    sessionIsLoading: state.ui.session.loading,
  }
}

const mapDispatch = dispatch => {
  return {
    login: formData => dispatch(login(formData)),
    resetSessionErrors: () => dispatch(resetSessionErrors()),
    checkIfUserExists: usernameOrEmail => dispatch(checkIfUserExists(usernameOrEmail)),
  }
}

export default withRouter(connect(mapState, mapDispatch)(LoginForm));