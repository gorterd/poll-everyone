/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/root_reducer'

const MUTED_ACTIONS = ['SET_DROPDOWN', 'CLEAR_DROPDOWN']
const middleware = [thunk]

if (process.env.NODE_ENV !== 'production') {
  const { createLogger } = require('redux-logger')
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error,
    predicate: (getState, action) => !MUTED_ACTIONS.includes(action.type)
  })
  middleware.push(logger)
}

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer, 
    preloadedState, 
    applyMiddleware(...middleware)
  )
}