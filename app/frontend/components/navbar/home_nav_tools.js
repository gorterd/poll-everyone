import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { fetchPollsIndex, fetchLogin, fetchParticipateApp, fetchSignupSplash } from '../lazy_load_index'
import { useDelayedPrefetch } from '../../hooks/effect'
import { useLoggedIn } from '../../hooks/api/query'
import { useDemoLogin, useLogout } from '../../hooks/api/mutation'
import QueryLink from '../shared/link'
import { pollsIndexQuery } from '../polls/polls_index'

export default function HomeNavTools() {
  const { mutate: demoLogin } = useDemoLogin()
  const { mutate: logout } = useLogout()
  const loggedIn = useLoggedIn()

  const prefetch = useCallback(() => {
    fetchParticipateApp()

    if (!loggedIn) {
      fetchSignupSplash()
      fetchLogin()
    } else {
      fetchPollsIndex()
    }
  }, [loggedIn])

  useDelayedPrefetch(prefetch)

  const tools = loggedIn
    ? [
      <QueryLink
        key='my-polls'
        className="button button-white"
        to='/polls'
        query={pollsIndexQuery}
      >My polls</QueryLink>,
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
        onClick={demoLogin}
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
