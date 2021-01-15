import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { RouteMiddleware } from './shared/wrappers/routes_util'
import { modalSelector, uiSelector } from '../util/hooks_selectors';
import ParticipantApp from './participant/participant_app';
import App from './app';


export default function AppContainer() {
  const { scrollY } = useSelector(uiSelector);
  const { type: modalType } = useSelector(modalSelector);

  useEffect(() => {
    if (!modalType) window.scrollTo(0, scrollY);
  }, [modalType]);

  return (
    <>
      <Route><RouteMiddleware /></Route>
      <section
        className={'app' + (modalType ? ' freeze-scroll' : '')}
        style={modalType ? { top: (scrollY * -1) } : null}
      >
        <Switch>
          <Route path='/participate'>
            <ParticipantApp />
          </Route>
          <App />
        </Switch>
      </section>
    </>
  );
}
