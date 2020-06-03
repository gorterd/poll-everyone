import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar'

const HomeNavbar = ({currentUser, logout}) => {
  const links = [
    <a className="nav-link" href="#">Github</a>
  ];

  const tools = currentUser ? 
    [
      <Link className="button button-white" to='/polls'>My polls</Link>,
      <button className="nav-tool" onClick={logout}>Log out</button>
    ] : [
      <button className="button button-white">Demo</button>,
      <Link className="button button-white" to='/signup/splash'>Sign up</Link>,
      <Link className="nav-tool" to='/login'>Log in</Link>
    ]

  return ( 
    <Navbar 
      relativeRootPath='/' 
      additionalClasses='nav-sticky'
      links={links}
      tools={tools}
    />
  );
}

export default HomeNavbar;