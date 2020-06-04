import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import App from './app';
import { StartAtTop } from '../util/routes_util'


export default ({store}) => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Route><StartAtTop /></Route>
        <App />
      </HashRouter>
    </Provider>
  )
}