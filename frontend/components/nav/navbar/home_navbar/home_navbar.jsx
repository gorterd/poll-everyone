import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar'

const HomeNavbar = ({currentUser, login, logout, history}) => {
  
  const DEMO_USERNAME = 'Simulation3845';
  const DEMO_PASSWORD = 'its_all_a_simulation';

  const _loginDemoUser = () => {
    login({
      usernameOrEmail: DEMO_USERNAME,
      password: DEMO_PASSWORD
    }).then( () => history.push('/polls'));
  }
  
  const links = [
    <a className="nav-link" href="https://github.com/gorterd">Github</a>,
    <a className="nav-link" href="https://www.linkedin.com/in/daniel-gorter-87549277">LinkedIn</a>,
    // <a className="nav-link" href="#">My website</a>,
  ];

  const tools = currentUser ? 
    [
      <Link className="button button-white" to='/polls'>My polls</Link>,
      <button className="nav-tool" onClick={logout}>Log out</button>
    ] : [
      <button className="button button-white" onClick={_loginDemoUser}>Demo</button>,
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