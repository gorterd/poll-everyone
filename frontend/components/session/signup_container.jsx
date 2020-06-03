import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { checkIfUserExists, signup } from "../../actions/session_actions";
import SignupForm from './signup_form';

const mapState = state => {
  return {
    sessionErrors: state.errors.session,
  }
}

const mapDispatch = dispatch => {
  return {
    signup: formData => dispatch(signup(formData)),
  }
}

export default withRouter(connect(mapState, mapDispatch)(SignupForm));