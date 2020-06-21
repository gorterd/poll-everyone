import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers/root_reducer';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');
  middleware.push(logger);
}

export default preloadedState => createStore(rootReducer, preloadedState, applyMiddleware(...middleware));