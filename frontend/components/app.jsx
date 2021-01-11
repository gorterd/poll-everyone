import React from 'react';
import { Route, Switch, matchPath } from 'react-router-dom';

import Navbar from './nav/navbar/navbar';
import Footer from './nav/footer';
import HomeNavbarContainer from './nav/navbar/home_navbar/home_navbar_container';

import HomeSplash from './nav/home_splash';

import EditPoll from './polls/poll/edit_poll';
import PresentPoll from './polls/poll/present_poll';

import LoginFormContainer from './session/login/login_container';
import SignupSplash from './session/signup/signup_splash';
import SignupFormContainer from './session/signup/signup_container';

import { AuthRoute, ProtectedRoute } from '../util/component/routes_util';
import { Modal } from './polls/modals/modal';

import ReportsIndex from './reports/reports_index'
import GroupsIndex from './polls/groups_index/groups_index';
import AppNavbar from './nav/navbar/app_navbar/app_navbar';


const App = () => {
  return (
    <>       
      <section className='content'>          
        <Switch>

          <Route exact path='/'><HomeNavbarContainer /></Route>
          <ProtectedRoute path={['/polls', '/account', '/reports']}><AppNavbar /></ProtectedRoute>
          <Navbar relativeRootPath={'/'} additionalClasses='nav-sticky' links={[]} tools={[]}/>
        </Switch>

        <ProtectedRoute exact path='/polls'>
          <GroupsIndex />
        </ProtectedRoute>

        <ProtectedRoute path='/polls/:pollId/edit'>
          <EditPoll />
        </ProtectedRoute>

        <ProtectedRoute path='/polls/:pollId/show'>
          <PresentPoll />
        </ProtectedRoute>

        <Route exact path='/'>
          <HomeSplash />
        </Route>

        <AuthRoute path='/login'>
          <LoginFormContainer/>
        </AuthRoute>

        <AuthRoute path='/signup/splash'>
          <SignupSplash />
        </AuthRoute>

        <AuthRoute path='/signup/create'>
          <SignupFormContainer />
        </AuthRoute>
      </section>

      <Route exact path={['/', '/polls', '/account']}>
        <Footer />
      </Route>

      <Modal />
    </>
  )
}

export default App;