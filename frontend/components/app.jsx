import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeNavbarContainer from './nav/home_navbar_container';
import Navbar from './nav/navbar';
import Footer from './nav/footer';
import HomeSplash from './homeSplash';
import AppNavbarContainer from './nav/app_navbar_container';
import { AuthRoute, ProtectedRoute } from '../util/routes_util';
import LoginFormContainer from './session/login_container';
import SignupFormContainer from './session/signup_container';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path='/'><HomeNavbarContainer /></Route>
        <ProtectedRoute path={['/polls', '/account', '/reports']}><AppNavbarContainer /></ProtectedRoute>
        <Navbar relativeRootPath={'/'} additionalClasses='nav-sticky'>
          {null}
          {null}
        </Navbar>
      </Switch>

      <Route exact path='/'>
        <HomeSplash />
      </Route>

      <Route path='/login'>
        <LoginFormContainer/>
      </Route>

      <Route path='/signup/splash'>
        <SignupFormContainer />
      </Route>

      <Route path='/signup/create'>
        <SignupFormContainer />
      </Route>

      <Footer />
    </>
  )
}

export default App;