import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../store/actions/session_actions';
import { loggedInSelector } from '../../util/hooks_selectors';
import { fetchGroupsIndex, fetchLogin, fetchParticipantApp, fetchSignupSplash } from '../lazy_load_index';
import { useDelayedPrefetch } from '../../util/custom_hooks';

export default function HomeNavTools() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(loggedInSelector);
  const history = useHistory();

  const prefetches = [fetchGroupsIndex, fetchParticipantApp];
  if (loggedIn) prefetches.concat(fetchSignupSplash, fetchLogin);
  useDelayedPrefetch(...prefetches);

  const loginDemoUser = () => {
    dispatch(login({
      usernameOrEmail: 'Simulation3845',
      password: 'its_all_a_simulation'
    })).then(() => history.push('/polls'));
  }

  const tools = loggedIn
    ? [
      <Link 
        key='my-polls' 
        className="button button-white" 
        to='/polls'
      >My polls</Link>,
      <button 
        key='logout' 
        className="nav-tool" 
        onClick={() => dispatch(logout())}
      >Log out</button>
    ]
    : [
      <button 
        key='demo' 
        className="button button-white" 
        onClick={loginDemoUser}
      >Demo Login</button>,
      <Link 
        key='signup'
        className="button button-white" 
        to='/signup/splash'
      >Sign up</Link>,
      <Link 
        key='login'
        className="nav-tool" 
        to='/login'
      >Log in</Link>
    ]
  
  return (
    <>
      <li key='participate'>
        <Link className="button button-white" to='/participate'>
          Participate
        </Link>
      </li>
      {tools.map((tool, i) => <li key={i}>{tool}</li>)}
    </>
  );
}
