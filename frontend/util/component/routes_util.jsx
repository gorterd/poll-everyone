import { connect } from 'react-redux'
import React from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom'

import { closeModal } from '../../actions/ui_actions'

const Auth = ({ Component, exact, path, loggedIn }) => {
  return (
    <Route exact={exact} path={path}>
        {loggedIn ? <Redirect to="/polls" /> : Component}
    </Route>
  )
}

const Protected = ({ Component, exact, path, loggedIn }) => {
  return (
    <Route exact={exact} path={path}>
      {loggedIn ? Component : <Redirect to="/login" />}
    </Route>
  )
}

const mapStateToRoutes = ({session}, ownProps) => ({ 
  loggedIn: Boolean(session.currentType === 'User'),
  Component: ownProps.children
})

export const AuthRoute = connect(mapStateToRoutes)(Auth);
export const ProtectedRoute = connect(mapStateToRoutes, null)(Protected);

const mapDispatchToMiddleware = dispatch => {
  return {
    closeModal: () => {
      dispatch(closeModal(0))
    }
  }
}

class RouteMiddlewareComponent extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      window.scrollTo(0, 0);
      this.props.closeModal();
    }
  }

  render() {
    return null;
  }
}

export const RouteMiddleware = withRouter(connect(null, mapDispatchToMiddleware)(RouteMiddlewareComponent));


