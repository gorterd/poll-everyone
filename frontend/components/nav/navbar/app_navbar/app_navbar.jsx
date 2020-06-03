import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar';
import AppNavbarDropdown from './app_navbar_dropdown';

const AppNavbar = props => {
  const links = [
    <Link to='/polls'>Polls</Link>,
    <Link to='/reports'>Reports</Link>
  ];

  const tools = <AppNavbarDropdown {...props} />

  return (
    <Navbar 
      relativeRootPath='/polls'
      links={links}
      tools={tools}
    ></Navbar>
  );
}

export default AppNavbar;