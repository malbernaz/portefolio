// Server imports
import { createProxyServer } from 'http-proxy'
import { resolve } from 'path'
import { Server } from 'http'
import compression from 'compression'
import express from 'express'
import morgan from 'morgan'
import serveStatic from 'serve-static'

// React imports
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { RouterContext, match, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import React from 'react'

// Project imports
import ApiClient from './helpers/ApiClient'
import config from './config'
import configureStore from './store'
import getRouter from './router'
import Html from './helpers/Html'
import WithStylesContext from './helpers/WithStylesContext'

import { loadAuth } from './actions/auth'
import { loadPosts } from './actions/posts'

// Server configuration
const app = express()
const port = process.env.PORT || 3000
const server = new Server(app)

// API proxy
const targetUrl = `http://${config.apiHost}:${config.apiPort}`
const proxy = createProxyServer({ target: targetUrl })

// Server middleware
app.use(compression())
// __dirname does not resolve to the right directory.
app.use(serveStatic(resolve('.', 'dist', 'public')))
app.use(morgan('dev'))

// console.log(process.env.DOCKER) // eslint-disable-line

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/` })
})

proxy.on('error', (error, req, res, json = null) => {
  if (error.code !== 'ECONNRESET') {
    console.log('proxy error', error) // eslint-disable-line no-console
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' })
  }
  let errJson = json
  errJson = { error: 'proxy_error', reason: error.message }
  res.end(JSON.stringify(errJson))
})

app.use((req, res) => {
  const client = new ApiClient(req)
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore(client, memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  function hydrateOnClient() {
    res.send(`<!doctype html>\n${
      renderToString(<Html />)
    }`)
  }

  match({
    history,
    routes: getRouter(store),
    location: req.url
  }, (
    err,
    redirectLocation,
    renderProps
  ) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    }

    if (err) {
      console.error(err) // eslint-disable-line no-console
      res.status(500).end('Internal Server Error')
      hydrateOnClient()
    }

    if (!renderProps) {
      return res.status(404).end('Not Found')
    }

    function renderPage() {
      const css = []

      const component = (
        <Provider store={ store } key="provider">
          <WithStylesContext onInsertCss={ s => css.push(s._getCss()) }>
            <RouterContext { ...renderProps } />
          </WithStylesContext>
        </Provider>
      )

      res.status(200)

      res.send(`<!doctype html>\n${
        renderToString(<Html component={ component } css={ css } store={ store } />)
      }`)

      global.navigator = { userAgent: req.headers['user-agent'] }
    }

    return store.dispatch(loadPosts())
      .then(
        () => store.dispatch(loadAuth()),
        () => store.dispatch(loadAuth()))
      .then(renderPage)
      .catch(renderPage)
  })
})

server.listen(port, err => {
  if (err) console.error(err) // eslint-disable-line no-console
  console.log(`==>  Server listening on port ${port}`) // eslint-disable-line no-console
})
