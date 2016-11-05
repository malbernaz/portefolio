import { createProxyServer } from 'http-proxy'
import { readFileSync, readlinkSync } from 'fs'
import { resolve } from 'path'
import compression from 'compression'
import crypto from 'crypto'
import express from 'express'
import favicon from 'express-favicon'
import http from 'http'
import morgan from 'morgan'
import serveStatic from 'serve-static'
import spdy from 'spdy'

import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { RouterContext, match, createMemoryHistory } from 'react-router/es6'
import { syncHistoryWithStore } from 'react-router-redux'
import React from 'react'

import ApiClient from './helpers/ApiClient'
import config from './config'
import configureStore from './store'
import getRouter from './router'
import Html from './helpers/Html'
import WithStylesContext from './helpers/WithStylesContext'

const __DEV__ = process.env.NODE_ENV !== 'production'

const app = express()

const options = __DEV__ ? {
  key: readFileSync(resolve(__dirname, 'certs', 'portefoliodev.key')),
  cert: readFileSync(resolve(__dirname, 'certs', 'portefoliodev.crt'))
} : {
  key: readFileSync(
    resolve(__dirname, 'certs', 'live', 'malbernaz.me', readlinkSync(
      resolve(__dirname, 'certs', 'live', 'malbernaz.me', 'privkey.pem')))),
  cert: readFileSync(
    resolve(__dirname, 'certs', 'live', 'malbernaz.me', readlinkSync(
      resolve(__dirname, 'certs', 'live', 'malbernaz.me', 'fullchain.pem')))),
}

const server = spdy.createServer(options, app)

const targetUrl = `http://${config.apiHost}:${config.apiPort}`
const proxy = createProxyServer({ target: targetUrl, ws: true })

app.enable('trust proxy')
app.use(compression())
app.use(serveStatic(resolve(__dirname, 'public')))
app.use(favicon(resolve(__dirname, 'public', 'img', 'icon.ico')))

if (!__DEV__) {
  app.use((req, res, next) =>
    !req.secure ? res.redirect(`https://${req.get('host')}:${req.url}`) : next())
}

if (__DEV__) {
  app.use(morgan('dev'))
}

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/api` })
})

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head)
})

proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error:', error) // eslint-disable-line no-console
  }

  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' })
  }

  res.end(JSON.stringify({ error: 'proxy_error', reason: error.message }))
})

app.use((req, res) => {
  const client = new ApiClient(req)
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore(client, memoryHistory)

  match({
    history: syncHistoryWithStore(memoryHistory, store),
    routes: getRouter(store),
    location: req.url
  }, (err, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    }

    if (err) {
      console.error(err) // eslint-disable-line no-console

      res.status(500).end('Internal server error. Please report to albernazmiguel@gmail.com')
    }

    if (!renderProps) {
      return res.status(404).end('Not Found')
    }

    function renderPage () {
      const css = []

      const component = (
        <Provider store={ store } key="provider">
          <WithStylesContext onInsertCss={ s => css.push(s._getCss()) }>
            <RouterContext { ...renderProps } />
          </WithStylesContext>
        </Provider>
      )

      const content = renderToString(
        <Html
          component={ component }
          css={ css }
          store={ store }
        />
      )

      const hash = crypto
        .createHash('sha256')
        .update(content)
        .digest('hex')

      // eslint-disable-next-line quote-props
      res.set({ 'Etag': hash, 'Cache-Control': 'public, no-cache' })
        .status(200)
        .send(`<!doctype html>${content}`)

      global.navigator = { userAgent: req.headers['user-agent'] }
    }

    return renderPage()
  })
})

http.createServer(app).listen(config.httpPort)

server.listen(config.httpsPort, err => {
  if (err) {
    console.log(err) // eslint-disable-line no-console
  }

  // eslint-disable-next-line no-console
  console.log(`\n==> App listening on port ${config.httpsPort}\n`)
})
