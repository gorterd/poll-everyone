import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';

import { modalSelector, uiSelector } from '../util/hooks_selectors';
import ParticipantApp from './participant/participant_app';
import { clearDropdown, exitModal } from '../store/actions/ui_actions';

import Navbar from './nav/navbar/navbar';
import Footer from './nav/footer';
import HomeNavbar from './nav/navbar/home_navbar';
import HomeSplash from './nav/home_splash';
import EditPoll from './polls/poll/edit_poll';
import PresentPoll from './polls/poll/present_poll';
import LoginFormContainer from './session/login/login_container';
import SignupSplash from './session/signup/signup_splash';
import SignupFormContainer from './session/signup/signup_container';
import GroupsIndex from './polls/groups_index/groups_index';
import AppNavbar from './nav/navbar/app_navbar/app_navbar';
import { Auth, Protected } from './shared/wrappers/routes_util';
import { Modal } from './shared/modal';
import ReportsIndex from './reports/reports_index'
import { useClearDropdown } from '../util/custom_hooks';

export default function App() {
  const { scrollY } = useSelector(uiSelector);
  const { type: modalType } = useSelector(modalSelector);
  const curPath = useLocation().pathname;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!modalType) window.scrollTo(0, scrollY);
  }, [modalType]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(exitModal());
  }, [curPath]);

  return (
    <section
      className={'app' + (modalType ? ' freeze-scroll' : '')}
      style={modalType ? { top: (scrollY * -1) } : null}
      onClick={() => dispatch(clearDropdown())}
    >
      <Switch>
        <Route path='/participate'>
          <ParticipantApp />
        </Route>
        <>
          <section className='content'>
            <Switch>
              <Route exact path='/'>
                <Auth>
                  <HomeNavbar />
                </Auth>
              </Route>

              <Route path={['/polls', '/account', '/reports']}>
                <Protected>
                  <AppNavbar />
                </Protected>
              </Route>

              <Navbar additionalClasses='nav-sticky' links={[]} tools={[]} />
            </Switch>

            <Route exact path='/polls'>
              <Protected>
                <GroupsIndex />
              </Protected>
            </Route>

            <Route path='/polls/:pollId/edit'>
              <Protected>
                <EditPoll />
              </Protected>
            </Route>

            <Route path='/polls/:pollId/show'>
              <Protected>
                <PresentPoll />
              </Protected>
            </Route>

            <Route exact path='/'>
              <HomeSplash />
            </Route>

            <Route path='/login'>
              <Auth>
                <LoginFormContainer />
              </Auth>
            </Route>

            <Route path='/signup/splash'>
              <Auth>
                <SignupSplash />
              </Auth>
            </Route>

            <Route path='/signup/create'>
              <Auth>
                <SignupFormContainer />
              </Auth>
            </Route>
          </section>

          <Route exact path={['/', '/polls', '/account']}>
            <Footer />
          </Route>

          <Modal />
        </>
      </Switch>
    </section>
  );
}