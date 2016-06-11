import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { renderToString } from 'react-dom/server'

import serialize from 'serialize-javascript'

const Html = ({ component, store }) => {
  const head = Helmet.rewind()
  const content = component
    ? renderToString(component)
    : ''

  return (
    <html lang="pt-br">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <meta charSet="UTF-8" />
        <title>!PRONTO</title>
        <meta
          httpEquiv="content-type"
          content="text/html; charset=UTF-8"
        />
        <meta
          name="viewport"
          content="width=device-width,
                  initial-scale=1,
                  maximum-scale=1,
                  user-scalable=no"
        />
        {/* <link rel="stylesheet" href="css/main.css" /> */}
      </head>
      <body>
        <div
          id="react-view"
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__=${
              serialize(store.getState())
            }`
          }}
          charSet="UTF-8"
        />
        <script src="scripts/vendor.bundle.js" charSet="UTF-8" />
        <script src="scripts/bundle.js" charSet="UTF-8" />
      </body>
    </html>
  )
}

Html.propTypes = {
  component: PropTypes.node,
  store: PropTypes.object
}

export default Html
