import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../navbar';
import AppNavbarDropdown from './app_navbar_dropdown';

const AppNavbar = ({modalType, stickyToolbar, closeModal, ...rest}) => {
  const links = [
    <NavLink activeClassName="navbar-active" to='/polls'>Polls</NavLink>,
  ];

  const tools = [<AppNavbarDropdown {...rest} />];
  const sticky = (modalType == 'new-poll' && !Boolean(stickyToolbar));

  return (
    <Navbar 
      additionalClasses={
        (sticky ? 'nav-sticky' : '')
        + (stickyToolbar ? 'invisible' : '')
      }
      relativeRootPath='/polls'
      onLogoClick={ modalType ? closeModal : null }
      links={links}
      tools={tools}
    ></Navbar>
  );
}

export default AppNavbar;