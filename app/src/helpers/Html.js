import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { renderToString } from 'react-dom/server'
import serialize from 'serialize-javascript'

const Html = ({ component, store, css }) => {
  const head = Helmet.rewind()
  const content = component ? renderToString(component) : ''

  return (
    <html lang="pt-BR">
      <head>
        { head.title.toComponent() }
        { head.meta.toComponent() }
        { head.link.toComponent() }
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <style>{ css.join('') }</style>
      </head>
      <body>
        <div id="react-view" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__=${serialize(store.getState())}`
          }}
          charSet="UTF-8"
        />
        <script src="/vendor.bundle.js" />
        <script src="/main.bundle.js" />
        { process.env.NODE_ENV === 'production' ? [
          <script
            key="0"
            dangerouslySetInnerHTML={{
              __html: `
                window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date
                ga('create', '${process.env.GANALYTICS}', 'auto')
                ga('send', 'pageview')
              `
            }}
          />,
          <script key="1" src="https://www.google-analytics.com/analytics.js" async />
        ] : '' }
      </body>
    </html>
  )
}

const { element, shape, func, string, arrayOf } = PropTypes

Html.propTypes = {
  component: element,
  store: shape({ getState: func }),
  css: arrayOf(string)
}

export default Html
