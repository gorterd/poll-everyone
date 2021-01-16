import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loggedInSelector } from '../../../util/hooks_selectors'

export const Auth = ({ children }) => {
  const loggedIn = useSelector(loggedInSelector);
  return loggedIn ? <Redirect to="/polls" /> : children;
}

export const Protected = ({ children }) => {
  const loggedIn = useSelector(loggedInSelector);
  return loggedIn ? children : <Redirect to="/login" />;
}