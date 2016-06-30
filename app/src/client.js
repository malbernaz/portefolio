import React from 'react'
import { render } from 'react-dom'
import { applyRouterMiddleware, Router, browserHistory } from 'react-router'
import useScroll from 'react-router-scroll'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import getRouter from './router'
import configureStore from './store'
import ApiClient from './helpers/ApiClient'

const initialState = window.__INITIAL_STATE__

const client = new ApiClient()
const store = configureStore(client, browserHistory, initialState)

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={ store }>
    <Router
      children={ getRouter(store) }
      history={ history }
      render={ applyRouterMiddleware(useScroll()) }
    />
  </Provider>, document.getElementById('react-view')
)