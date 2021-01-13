import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { RouteMiddleware } from './shared/wrappers/routes_util'
import { modalSelector, uiSelector } from '../util/hooks_selectors';
import ParticipantApp from './participant/participant_app';
import App from './app';


export default function AppContainer() {
  const { scrollY } = useSelector(uiSelector);
  const modal = useSelector(modalSelector);

  useEffect(() => {
    console.log(modal)
    if (!modal.type) window.scrollTo(0, scrollY);
  }, [modal]);

  return (
    <HashRouter>
      <Route><RouteMiddleware /></Route>
      <section
        className={'app' + (modal.type ? ' freeze-scroll' : '')}
        style={modal.type ? { top: (scrollY * -1) } : null}
      >
        <Switch>
          <Route path='/participate'>
            <ParticipantApp />
          </Route>
          <App />
        </Switch>
      </section>
    </HashRouter>
  );
}
