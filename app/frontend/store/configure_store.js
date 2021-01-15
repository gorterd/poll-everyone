import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root_reducer';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error
  })
  middleware.push(logger);
}

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer, 
    JSON.parse(preloadedState), 
    applyMiddleware(...middleware)
  );
}