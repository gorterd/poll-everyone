import { connect} from 'react-redux';
import { login, logout } from '../../../../actions/session_actions';
import HomeNavbar from './home_navbar';
import { withRouter } from 'react-router-dom';

const mapState = state => {
  return {
    currentUser: state.session.currentType === 'User' && state.entities.users[state.session.currentId],
  }
}

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout()),
    login: formData => dispatch(login(formData)),
  }
}

export default withRouter(connect(mapState, mapDispatch)(HomeNavbar));