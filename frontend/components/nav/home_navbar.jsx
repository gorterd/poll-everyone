import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar'

const HomeNavbar = ({currentUser, logout}) => {
  const links = (
    <>
      <a className="nav-link" href="#">Github</a>
    </>
  );

  const tools = currentUser ? (
    <>
      <button>My Polls</button>
      <button onClick={logout}>Log out</button>
    </>
  ) : (
    <>
      <button>Demo</button>
      <Link to='/signup/splash'>Sign up</Link>
      <Link to='/login'>Log in</Link>
    </>
  )

  return ( 
    <Navbar relativeRootPath='/' additionalClasses='nav-sticky'>
      {links}
      {tools}
    </Navbar>
  );
}

export default HomeNavbar;