import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import AppNavbar from './app_navbar';

const mapState = state => {
  return {
    currentUser: state.entities.users[state.session.currentId],
  }
}

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(mapState, mapDispatch)(AppNavbar);