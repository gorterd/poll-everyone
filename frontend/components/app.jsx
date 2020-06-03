import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeNavbarContainer from './nav/navbar/home_navbar/home_navbar_container';
import Navbar from './nav/navbar/navbar';
import Footer from './nav/footer';
import HomeSplash from './nav/home_splash';
import AppNavbarContainer from './nav/navbar/app_navbar/app_navbar_container';
import { AuthRoute, ProtectedRoute } from '../util/routes_util';
import LoginFormContainer from './session/login/login_container';
import SignupFormContainer from './session/signup/signup_container';
import SignupSplash from './session/signup/signup_splash';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path='/'><HomeNavbarContainer /></Route>
        <ProtectedRoute path={['/polls', '/account', '/reports']}><AppNavbarContainer /></ProtectedRoute>
        <Navbar relativeRootPath={'/'} additionalClasses='nav-sticky' links={[]} tools={[]}/>
      </Switch>

      <Route exact path='/'>
        <HomeSplash />
      </Route>

      <Route path='/login'>
        <LoginFormContainer/>
      </Route>

      <Route path='/signup/splash'>
        <SignupSplash />
      </Route>

      <Route path='/signup/create'>
        <SignupFormContainer />
      </Route>

      <Footer />
    </>
  )
}

export default App;