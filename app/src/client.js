import 'webpack-dev-server/client?http://0.0.0.0:3001'
import 'webpack/hot/only-dev-server'
import 'react-hot-loader/patch'

import React from 'react'
import ReactDOM from 'react-dom'
import { match, applyRouterMiddleware, browserHistory } from 'react-router/es6'
import { useScroll } from 'react-router-scroll'
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'

import configureStore from './store'
import ApiClient from './helpers/ApiClient'

const initialState = window.__INITIAL_STATE__
const client = new ApiClient()
const store = configureStore(client, browserHistory, initialState)
const history = syncHistoryWithStore(browserHistory, store)

const mountPoint = document.getElementById('react-view')

const renderApp = () => {
  const Root = require('./containers/Root').default // eslint-disable-line
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
  module.hot.accept([
    './router',
    './containers/Root',
    './containers/Editor',
    './containers/SignIn',
    './helpers/WithStylesContext'
  ], renderApp)
}
