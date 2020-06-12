import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import AppContainer from './app_container';
import { RouteMiddleware } from '../util/component/routes_util'
import ParticipantApp from './participant/participant_app';

export default ({store}) => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Route><RouteMiddleware /></Route>
        <AppContainer />
      </HashRouter>
    </Provider>
  )
}


