import { connect } from 'react-redux';
import { logout } from '../../../../actions/session_actions';
import AppNavbar from './app_navbar';
import { closeModal } from '../../../../actions/ui_actions';

const mapState = state => {
  return {
    currentUser: state.entities.users[state.session.currentId],
    modalType: state.ui.modal.type,
    stickyToolbar: state.ui.stickyToolbar,
  }
}

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout()),
    closeModal: () => dispatch(closeModal(400)),
  }
}

export default connect(mapState, mapDispatch)(AppNavbar);