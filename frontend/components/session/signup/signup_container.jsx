import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signup, resetSessionErrors } from "../../../actions/session_actions";
import SignupForm from './signup_form';

const mapState = state => {
  return {
    sessionErrors: state.errors.session,
    sessionIsLoading: state.ui.sessionLoading,
  }
}

const mapDispatch = dispatch => {
  return {
    signup: formData => dispatch(signup(formData)),
    resetSessionErrors: () => dispatch(resetSessionErrors()),
  }
}

export default withRouter(connect(mapState, mapDispatch)(SignupForm));