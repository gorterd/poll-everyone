import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useLoggedIn } from '../../hooks/api/query'

export const AuthRoute = ({ children, ...routeProps }) => {
  const loggedIn = useLoggedIn()

  return (
    <Route {...routeProps}>
      {loggedIn ? <Redirect to="/polls" /> : children}
    </Route>
  )
}

export const ProtectedRoute = ({ children, ...routeProps }) => {
  const loggedIn = useLoggedIn()

  return (
    <Route {...routeProps}>
      {loggedIn ? children : <Redirect to="/login" />}
    </Route>
  )
}