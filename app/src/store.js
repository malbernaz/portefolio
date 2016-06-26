import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import { DevTools } from './components'

import createMiddleware from './middleware/clientMiddleware'
import rootReducer from './reducers'

const configureStore = (client, history, initialState = {}) => {
  const reduxRouterMiddleware = routerMiddleware(history)
  const middleware = [
    createMiddleware(client),
    reduxRouterMiddleware
  ]

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      typeof window === 'object' ?
        DevTools.instrument() :
        f => f
    )
  )
  return store
}

export default configureStore
