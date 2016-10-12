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
import { showMessage } from './actions/message'

const initialState = window.__INITIAL_STATE__
const client = new ApiClient()
const store = configureStore(client, browserHistory, initialState)
const history = syncHistoryWithStore(browserHistory, store)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: './' }).then(reg => {
    reg.onupdatefound = function () { // eslint-disable-line no-param-reassign
      const installingWorker = reg.installing

      installingWorker.onstatechange = function () {
        switch (installingWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
              store.dispatch(showMessage('New or updated content is available.'))
            } else {
              store.dispatch(showMessage('Content is now available offline!'))
            }
            break
          case 'redundant':
            store.dispatch(showMessage('The installing service worker became redundant.'))
            break
          default:
            break
        }
      }
    }
  }).catch(e => {
    store.dispatch(showMessage(`Error during service worker registration: ${e}`))
  })
}

render(
  <Provider store={ store }>
    <WithStylesContext onInsertCss={ s => s._insertCss() }>
      <Router
        history={ history }
        render={ applyRouterMiddleware(useScroll()) }
        routes={ getRouter(store) }
      />
    </WithStylesContext>
  </Provider>, document.getElementById('react-view')
)
