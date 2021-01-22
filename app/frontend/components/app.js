import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Navbar from './nav/navbar/navbar';
import Footer from './nav/footer';
import EditPoll from './polls/poll/edit_poll';
import LoginFormContainer from './session/login/login_container';
import { AuthRoute, ProtectedRoute } from './shared/wrappers/routes_util';
import { Modal } from './shared/modal';
import ReportsIndex from './reports/reports_index'
import DOMUtilities from './dom_utilities';
import { useOnFirstRender, useStateValue } from '../util/custom_hooks';
import { componentDoneLoading, componentLoading } from '../store/actions/ui_actions';

import { 
  ParticipantApp,
  HomeSplash,
  SignupSplash,
  SignupFormContainer,
  GroupsIndex,
  PresentPoll
} from './lazy_load_index';

const Fallback = ({ componentName }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(componentLoading(componentName))
    return () => dispatch(componentDoneLoading());
  }, [])

  return null;
};

export default function App() {
  const scrollY = useStateValue('ui scrollY');
  const modalType = useStateValue('modal type');
  
  return (
    <section
      className={'app' + (modalType ? ' freeze-scroll' : '')}
      style={modalType ? { top: (scrollY * -1) } : null}
    >
      <DOMUtilities />
      <React.Suspense fallback={<Fallback componentName='app'/>}>
        <Switch>
          <Route path='/participate'>
            <ParticipantApp/>
          </Route>
          <>
            <section className='content'>
              <Navbar />

              <React.Suspense fallback={<Fallback componentName='content'/>}>
                <Route exact path='/'>
                  <HomeSplash />
                </Route>

                <AuthRoute path='/login'>
                  <LoginFormContainer />
                </AuthRoute>

                <AuthRoute path='/signup/splash'>
                  <SignupSplash />
                </AuthRoute>

                <AuthRoute path='/signup/create'>
                  <SignupFormContainer />
                </AuthRoute>

                <ProtectedRoute exact path='/polls'>
                  <GroupsIndex />
                </ProtectedRoute>

                <ProtectedRoute path='/polls/:pollId/edit'>
                  <EditPoll />
                </ProtectedRoute>

                <ProtectedRoute path='/polls/:pollId/show'>
                  <PresentPoll />
                </ProtectedRoute>
              </React.Suspense>
            </section>

            <Route exact path={['/', '/polls', '/account']}>
              <Footer />
            </Route>

            <Modal />
          </>
        </Switch>
      </React.Suspense>
    </section>
  );
}