import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import clientMiddleware from './middleware/clientMiddleware'
import rootReducer from './reducers'

const configureStore = (client, history, initialState = {}) => {
  const reduxRouterMiddleware = routerMiddleware(history)
  const middleware = [
    clientMiddleware(client),
    reduxRouterMiddleware
  ]

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined' ?
        window.devToolsExtension() : f => f
    )
  )
  return store
}

export default configureStore
