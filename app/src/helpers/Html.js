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
        <script src="/scripts/vendor.bundle.js" defer />
        <script src="/scripts/main.bundle.js" defer />
      </body>
    </html>
  )
}

Html.propTypes = {
  component: PropTypes.node,
  store: PropTypes.object,
  css: PropTypes.array
}

export default Html
