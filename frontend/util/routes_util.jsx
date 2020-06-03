import { connect } from 'react-redux'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const Auth = ({ Component, exact, path, loggedIn }) => {
  return (
    <Route exact={exact} path={path}>
        {loggedIn ? <Redirect to="/polls" /> : <Component />}
    </Route>
  )
}

const Protected = ({ Component, exact, path, loggedIn }) => {
  return (
    <Route exact={exact} path={path}>
      {loggedIn ? {Component} : <Redirect to="/login" />}
    </Route>
  )
}


const mapState = ({session}, ownProps) => ({ 
  loggedIn: Boolean(session.currentType === 'user'),
  Component: ownProps.children[0]
})


export const AuthRoute = connect(mapState)(Auth);
export const ProtectedRoute = connect(mapState, null)(Protected);