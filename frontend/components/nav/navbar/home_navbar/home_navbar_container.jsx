import { connect} from 'react-redux';
import { logout } from '../../../../actions/session_actions';
import HomeNavbar from './home_navbar';

const mapState = state => {
  return {
    currentUser: state.session.currentType === 'user' && state.entities.users[state.session.currentId],
  }
}

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(mapState, mapDispatch)(HomeNavbar);