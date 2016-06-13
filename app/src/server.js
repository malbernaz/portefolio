// Server imports
import Express from 'express'
import compression from 'compression'
import { Server } from 'http'
import path from 'path'
import { createProxyServer } from 'http-proxy'
import morgan from 'morgan'

// React imports
import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

// Project imports
import config from './config'
import configureStore from './store'
import getRouter from './router'
import Html from './helpers/Html'
import ApiClient from './helpers/ApiClient'
import { auth, posts } from './actions'

const { loadAuth } = auth
const { loadPosts } = posts

// Server configuration
const app = new Express()
const server = new Server(app)
const port = process.env.PORT || 3000


// API proxy
const targetUrl = `http://${config.apiHost}:${config.apiPort}`
const proxy = createProxyServer({
  target: targetUrl,
  ws: true
})

// Server middleware
app.use(compression())
app.use(Express.static(path.resolve(__dirname, '..', 'dist', 'public')))
app.use(morgan('dev'))

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/` })
})

app.use('/ws', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/ws` })
})

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head)
})

proxy.on('error', (error, req, res, json = null) => {
  if (error.code !== 'ECONNRESET') {
    console.log('proxy error', error)
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
      res.redirect(
        redirectLocation.pathname +
        redirectLocation.search
      )
    }

    if (err) {
      console.error(err)
      res.status(500).end('Internal Server Error')
      hydrateOnClient()
    }

    if (!renderProps) {
      return res.status(404).end('Not Found')
    }

    function renderPage() {
      const component = (
        <Provider store={store} key="provider">
          <RouterContext {...renderProps} />
        </Provider>
      )

      res.status(200)

      res.send(`<!doctype html>\n${
        renderToString(
          <Html
            component={component}
            store={store}
          />
        )
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
  if (err) console.error(err)
  console.log(`==>  Server listening on port ${port}`)
})
