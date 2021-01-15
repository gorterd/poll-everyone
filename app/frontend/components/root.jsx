import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import configureStore from '../store/configure_store';
import AppContainer from './app_container';

export default ({ preloadedState }) => (
  <Provider store={configureStore(preloadedState)} >
    <HashRouter>
      <AppContainer />
    </HashRouter>
  </Provider>
);