import React, { useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { fetchGroupsIndex, fetchLogin, fetchParticipateApp, fetchSignupSplash } from '../lazy_load_index'
import { useDelayedPrefetch } from '../../hooks/effect'
import { useLoggedIn } from '../../hooks/api/query'
import { useLogin, useLogout } from '../../hooks/api/mutation'

export default function HomeNavTools() {
  const { mutateAsync: login } = useLogin()
  const { mutate: logout } = useLogout()
  const loggedIn = useLoggedIn()
  const history = useHistory()

  const prefetch = useCallback(() => {
    fetchGroupsIndex()
    fetchParticipateApp()
    
    if (loggedIn) {
      fetchSignupSplash()
      fetchLogin()
    }
  }, [loggedIn])
  
  useDelayedPrefetch(prefetch)

  const loginDemoUser = () => login({
    usernameOrEmail: 'Simulation3845',
    password: 'its_all_a_simulation'
  }).then(() => history.push('/polls'))

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
        onClick={logout}
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
  )
}
