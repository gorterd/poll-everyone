import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();
  ReactDOM.render(<Root store={store}/>, root);


  window.getState = store.getState;
  window.dispatch = store.dispatch;
})

import { 
  signup,
  login,
  logout,
  updateUser,
  checkIfUserExists
} from "./actions/session_actions";

Object.assign(window, {
  signup,
  login,
  logout,
  updateUser,
  checkIfUserExists
})