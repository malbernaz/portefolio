import React from 'react'
import ReactDOM from 'react-dom'
import { match, applyRouterMiddleware, browserHistory } from 'react-router'
import { useScroll } from 'react-router-scroll'
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'
import registerServiceWorker from './sw-register'

import configureStore from './store'
import ApiClient from './helpers/ApiClient'

import Root from './containers/Root'

if (process.env.NODE_ENV === 'production') {
  registerServiceWorker()
}

const initialState = window.__INITIAL_STATE__
const client = new ApiClient()
const store = configureStore(client, browserHistory, initialState)
const history = syncHistoryWithStore(browserHistory, store)

const mountPoint = document.getElementById('react-view')

const renderApp = () => {
  const getRouter = require('./router').default // eslint-disable-line

  match({
    routes: getRouter(store),
    render: applyRouterMiddleware(useScroll()),
    history
  }, (err, redirect, renderProps) => {
    ReactDOM.render(
      <AppContainer>
        <Root store={ store } renderProps={ renderProps } />
      </AppContainer>, mountPoint
    )
  })
}

renderApp()

if (module.hot) {
  module.hot.accept(['./router'], renderApp)
}
