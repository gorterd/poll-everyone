import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { loggedInSelector } from '../../util/hooks_selectors'

export const AuthRoute = ({ children, ...routeProps }) => {
  const loggedIn = useSelector(loggedInSelector);
  return (
    <Route {...routeProps}>
      { loggedIn ? <Redirect to="/polls" /> : children }
    </Route>
  );
}

export const ProtectedRoute = ({ children, ...routeProps }) => {
  const loggedIn = useSelector(loggedInSelector);
  return (
    <Route {...routeProps}>
      { loggedIn ? children : <Redirect to="/login" /> }
    </Route>
  );
}