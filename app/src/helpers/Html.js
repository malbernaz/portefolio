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
          content=" width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <style>{ css.join('') }</style>
      </head>
      <body>
        <div id="react-view" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__=${
              serialize(store.getState())
            }`
          }}
          charSet="UTF-8"
        />
        <script src="/vendor.bundle.js" defer />
        <script src="/main.bundle.js" defer />
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
