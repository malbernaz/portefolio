import React from 'react'
import { render } from 'react-dom'
import { match, applyRouterMiddleware, Router, browserHistory } from 'react-router/es6'
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

match({
  history,
  routes: getRouter(store),
  render: applyRouterMiddleware(useScroll())
}, (err, redirect, renderProps) => {
  render(
    <Provider store={ store }>
      <WithStylesContext onInsertCss={ s => s._insertCss() }>
        <Router { ...renderProps } />
      </WithStylesContext>
    </Provider>, document.getElementById('react-view')
  )
})
