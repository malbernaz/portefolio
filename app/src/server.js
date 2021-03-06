import { createProxyServer } from 'http-proxy'
import { readFileSync, readlinkSync } from 'fs'
import { resolve } from 'path'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import favicon from 'express-favicon'
import http from 'http'
import morgan from 'morgan'
import serveStatic from 'serve-static'
import spdy from 'spdy'

import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { RouterContext, match, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import React from 'react'

import ApiClient from './helpers/ApiClient'
import config from './config'
import configureStore from './store'
import getRouter from './router'
import assets from './assets' // eslint-disable-line
import Html from './helpers/Html'
import WithStylesContext from './helpers/WithStylesContext'

const __DEV__ = process.env.NODE_ENV !== 'production'

const app = express()

const options = __DEV__ ? {
  key: readFileSync(resolve(__dirname, '../certs/portefoliodev.key')),
  cert: readFileSync(resolve(__dirname, '../certs/portefoliodev.crt'))
} : {
  key: readFileSync(
    resolve(__dirname, '../certs/live/malbernaz.me',
      readlinkSync(resolve(__dirname, '../certs/live/malbernaz.me/privkey.pem'))
    )
  ),
  cert: readFileSync(
    resolve(__dirname, '../certs/live/malbernaz.me',
      readlinkSync(resolve(__dirname, '../certs/live/malbernaz.me/fullchain.pem'))
    )
  )
}

const http2Server = spdy.createServer(options, app)
const httpServer = http.createServer(app)

const targetUrl = `http://${config.apiHost}:${config.apiPort}`
const proxy = createProxyServer({ target: targetUrl, ws: true })

app.enable('trust proxy')
app.use(cors())
app.use(compression())
app.use(serveStatic(resolve(__dirname, 'public')))
app.use(favicon(resolve(__dirname, 'public', 'favicon.ico')))

if (!__DEV__) {
  app.use((req, res, next) => !req.secure ?
    res.redirect(`https://${req.get('host')}:${req.url}`) : next())
}

app.use(morgan(__DEV__ ? 'dev' : 'combined'))

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/api` })
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

const chunksToPreload = Object.keys(assets).map(c => assets[c].js)

const linkHeader = chunksToPreload.map(c => `<${c}>;rel=preload;as=script`).join(',')

app.get('*', (req, res) => {
  const client = new ApiClient(req)
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore(client, memoryHistory)

  match({
    history: syncHistoryWithStore(memoryHistory, store),
    routes: getRouter(store),
    location: req.url
  }, (err, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return res.redirect(redirectLocation.pathname + redirectLocation.search)
    }

    if (err) {
      console.error(err) // eslint-disable-line no-console

      return res.status(500).send('Internal server error.')
    }

    if (req._parsedUrl.pathname === '/') {
      return res.redirect('/blog')
    }

    if (!renderProps) {
      return res.redirect('/notfound')
    }

    function renderPage () {
      const css = []

      const component = renderToString(
        <Provider store={ store } key="provider">
          <WithStylesContext onInsertCss={ s => css.push(s._getCss()) }>
            <RouterContext { ...renderProps } />
          </WithStylesContext>
        </Provider>
      )

      const htmlProps = {
        component,
        css: css.join(''),
        store,
        chunks: chunksToPreload,
        main: assets.main.js,
        vendor: assets.vendor.js
      }

      const content = renderToString(<Html { ...htmlProps } />)

      res.append('Link', linkHeader)

      res.send(`<!doctype html>${content}`)

      global.navigator = { userAgent: req.headers['user-agent'] }
    }

    return renderPage()
  })
})

httpServer.listen(config.httpPort, err => console.log( // eslint-disable-line no-console
  err || `\n==> Http App listening on port ${config.httpPort}\n`
))

http2Server.listen(config.httpsPort, err => console.log( // eslint-disable-line no-console
  err || `\n==> Http2 App listening on port ${config.httpsPort}\n`
))
