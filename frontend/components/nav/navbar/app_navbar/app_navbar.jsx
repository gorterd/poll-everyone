import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { closeModal } from '../../../../actions/ui_actions';
import { modalTypeSelector } from '../../../../util/hooks_selectors';
import Navbar from '../navbar';
import AppNavbarDropdown from './app_navbar_dropdown';

export default function AppNavbar () {
  const links = [
    <NavLink activeClassName="navbar-active" to='/polls'>Polls</NavLink>,
  ];

  const tools = [<AppNavbarDropdown />];

  const modalType = useSelector(modalTypeSelector);

  return (
    <Navbar 
      additionalClasses=''
      relativeRootPath='/polls'
      onLogoClick={modalType ? () => useDispatch()(closeModal()) : null }
      links={links}
      tools={tools}
    ></Navbar>
  );
}

// export default AppNavbar;

// import { connect } from 'react-redux';
// import { logout } from '../../../../actions/session_actions';
// import AppNavbar from './app_navbar';
// import { closeModal } from '../../../../actions/ui_actions';

// const mapState = state => {
//   return {
//     currentUser: state.entities.users[state.session.currentId],
//     modalType: state.ui.modal.type,
//     stickyToolbar: state.ui.stickyToolbar,
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     logout: () => dispatch(logout()),
//     closeModal: () => dispatch(closeModal(400)),
//   }
// }

// export default connect(mapState, mapDispatch)(AppNavbar);