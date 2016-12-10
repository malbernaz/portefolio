import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import serialize from 'serialize-javascript'

const analytics = `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;ga('create','${process.env.GANALYTICS}','auto');ga('send','pageview')`

const Html = ({ component, store, css, main, vendor, chunks }) => {
  const head = Helmet.rewind()
  const initialState = `window.__INITIAL_STATE__=${serialize(store.getState())}`

  return (
    <html lang="en">
      <head>
        { head.title.toComponent() }
        { head.meta.toComponent() }
        { head.link.toComponent() }

        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
        />

        <style id="critical-css" dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>
        <main dangerouslySetInnerHTML={{ __html: component }} />

        <script dangerouslySetInnerHTML={{ __html: initialState }} />
        <script src={ vendor } defer />
        <script src={ main } defer />

        { chunks.map(c =>
          <link rel="preload" as="script" href={ c } key={ c } />
        ) }

        { process.env.NODE_ENV === 'production' ? [
          <script dangerouslySetInnerHTML={{ __html: analytics }} />,
          <script src="https://www.google-analytics.com/analytics.js" async />
        ] : '' }
      </body>
    </html>
  )
}

const { arrayOf, shape, func, string } = PropTypes

Html.propTypes = {
  component: string,
  store: shape({ getState: func }),
  css: string,
  main: string,
  vendor: string,
  chunks: arrayOf(string)
}

export default Html
