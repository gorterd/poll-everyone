import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = loadStore();
  ReactDOM.render(<Root store={store}/>, root);
})

const loadStore = () => {
  const preloadedState = (window.currentUser) ? 
    {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: {
        currentType: 'User',
        currentId: window.currentUser.id
      }
    } : 
    {
      session: {
        currentType: 'UnregisteredParticipant',
        currentId: window.currentParticipantId
      }
    }

  document.getElementById('boostrap-script').remove();
  delete window.currentUser;
  delete window.currentParticipantId;
  return configureStore(preloadedState);
}

