import React from 'react'
import ReactDOM from 'react-dom'
import { match, applyRouterMiddleware, browserHistory } from 'react-router'
import { useScroll } from 'react-router-scroll'
import { syncHistoryWithStore } from 'react-router-redux'
import registerServiceWorker from './sw-register'

import configureStore from './store'
import ApiClient from './helpers/ApiClient'

import Root from './containers/Root'

const initialState = window.__INITIAL_STATE__
const client = new ApiClient()
const store = configureStore(client, browserHistory, initialState)
const history = syncHistoryWithStore(browserHistory, store)

registerServiceWorker(store)
if (process.env.NODE_ENV === 'production') {
  registerServiceWorker(store)
}

const mnt = document.querySelector('main')

function renderApp () {
  const getRouter = require('./router').default // eslint-disable-line

  match({
    routes: getRouter(store),
    render: applyRouterMiddleware(useScroll()),
    history,
  }, (err, redirect, renderProps) => {
    ReactDOM.render(<Root store={ store } renderProps={ renderProps } />, mnt)
  })
}

renderApp()

if (module.hot) module.hot.accept(['./router'], renderApp)
