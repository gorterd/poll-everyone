import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = loadStore();
  ReactDOM.render(<Root store={store}/>, root);


  window.getState = store.getState;
  window.dispatch = store.dispatch;
})

const loadStore = () => {
  if (window.currentUser){
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: {
        currentType: 'user',
        currentId: window.currentUser.id
      }
    }

    document.getElementById('boostrap-script').remove();
    delete window.currentUser;
    return configureStore(preloadedState);
  } else { return configureStore() }
}


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