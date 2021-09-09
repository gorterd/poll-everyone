/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/root_reducer'

let logger
if (process.env.NODE_ENV !== 'production') {
  const { createLogger } = require('redux-logger')
  const mutedActions = []
  logger = createLogger({
    collapsed: (_, __, logEntry) => !logEntry.error,
    predicate: (_, action) => !mutedActions.includes(action.type)
  })
}

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    logger && applyMiddleware(logger)
  )
}