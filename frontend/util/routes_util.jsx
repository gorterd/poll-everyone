import { connect } from 'react-redux'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const Auth = ({ component: Component, exact, path, loggedIn }) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={ props =>
        loggedIn ? <Redirect to="/polls" /> : <Component {...props} />
      }
    />
  )
}

const Protected = ({ Component, exact, path, loggedIn }) => {
  return (
    <Route exact={exact} path={path}>
      {loggedIn ? Component : <Redirect to="/login" />}
    </Route>
  )
}


const mapState = ({session}, ownProps) => ({ 
  loggedIn: Boolean(session.currentType === 'user'),
  Component: ownProps.children
})


export const AuthRoute = connect(mapState)(Auth);
export const ProtectedRoute = connect(mapState, null)(Protected);