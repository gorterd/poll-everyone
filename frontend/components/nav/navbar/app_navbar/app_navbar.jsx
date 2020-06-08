import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../navbar';
import AppNavbarDropdown from './app_navbar_dropdown';

const AppNavbar = ({modalType, stickyToolbar, ...rest}) => {
  const links = [
    <NavLink activeClassName="navbar-active" to='/polls'>Polls</NavLink>,
    <NavLink activeClassName="navbar-active" to='/reports'>Reports</NavLink>
  ];

  const tools = [<AppNavbarDropdown {...rest} />]

  return (
    <Navbar 
      additionalClasses={
        ((modalType == 'new-poll' && !Boolean(stickyToolbar)) ? 'nav-sticky' : '')
        + (stickyToolbar ? 'invisible' : '')
      }
      relativeRootPath='/polls'
      links={links}
      tools={tools}
    ></Navbar>
  );
}

export default AppNavbar;