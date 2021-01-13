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

export default preloadedState => createStore(rootReducer, preloadedState, applyMiddleware(...middleware));