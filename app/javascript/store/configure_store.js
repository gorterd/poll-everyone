import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root_reducer';

export default function configureStore() {
  const middleware = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    const { createLogger } = require('redux-logger');
    const logger = createLogger({
      collapsed: (getState, action, logEntry) => !logEntry.error
    })
    middleware.push(logger);
  }

  const preloadedState = window.currentUser
    ? {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: {
        currentType: 'User',
        currentId: window.currentUser.id
      }
    }
    : {
      session: {
        currentType: 'UnregisteredParticipant',
        currentId: window.currentParticipantId
      }
    }

  document.getElementById('boostrap-script').remove();
  delete window.currentUser;
  delete window.currentParticipantId;
  
  return createStore(
    rootReducer, 
    preloadedState, 
    applyMiddleware(...middleware)
  );
}