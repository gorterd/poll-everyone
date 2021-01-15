import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from './navbar'
import { login, logout } from '../../../store/actions/session_actions';
import { useDispatch, useSelector } from 'react-redux';
import { loggedInSelector } from '../../../util/hooks_selectors';

export default function HomeNavbar() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(loggedInSelector);
  const history = useHistory();

  const _loginDemoUser = () => {
    dispatch(login({
      usernameOrEmail: 'Simulation3845',
      password: 'its_all_a_simulation'
    })).then( () => history.push('/polls'));
  }
  
  const links = [
    <a className="nav-link" href="https://github.com/gorterd">Github</a>,
    <a className="nav-link" href="https://www.linkedin.com/in/daniel-gorter-87549277">LinkedIn</a>,
    // <a className="nav-link" href="#">My website</a>,
  ];

  const tools = loggedIn
    ? [
      <Link className="button button-white" to='/polls'>My polls</Link>,
      <button className="nav-tool" onClick={() => dispatch(logout())}>Log out</button>
    ] 
    : [
      <button className="button button-white" onClick={_loginDemoUser}>Demo</button>,
      <Link className="button button-white" to='/signup/splash'>Sign up</Link>,
      <Link className="nav-tool" to='/login'>Log in</Link>
    ]

  return ( 
    <Navbar 
      additionalClasses='nav-sticky'
      links={links}
      tools={tools}
    />
  );
}