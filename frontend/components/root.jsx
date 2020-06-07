import React from 'react';
import { connect, Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

import App from './app';
import { RouteMiddleware } from '../util/component/routes_util'

const mapState = ({ ui: { modal } }) => ({ modal });

const AppContainer = connect(mapState)(({ modal }) => (
  <section className={ modal ? "freeze-scroll" : ""}>
    <App />
  </section>
));

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


