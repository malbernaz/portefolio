import React from 'react'
import { render } from 'react-dom'
import { applyRouterMiddleware, Router, browserHistory } from 'react-router/es6'
import { useScroll } from 'react-router-scroll'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import getRouter from './router'
import configureStore from './store'
import ApiClient from './helpers/ApiClient'
import WithStylesContext from './helpers/WithStylesContext'

const initialState = window.__INITIAL_STATE__
const client = new ApiClient()
const store = configureStore(client, browserHistory, initialState)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={ store }>
    <WithStylesContext onInsertCss={ s => s._insertCss() }>
      <Router history={ history } render={ applyRouterMiddleware(useScroll()) }>
        { getRouter(store) }
      </Router>
    </WithStylesContext>
  </Provider>, document.getElementById('react-view')
)

// require('offline-plugin/runtime').install() // ServiceWorker
