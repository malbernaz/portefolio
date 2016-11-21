import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import serialize from 'serialize-javascript'

const head = Helmet.rewind()

const Html = ({ component, store, css }) => (
  <html lang="en">
    <head>
      { head.title.toComponent() }
      { head.meta.toComponent() }
      { head.link.toComponent() }

      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
      />

      <style id="critical-css" dangerouslySetInnerHTML={{ __html: css.join('') }} />
    </head>
    <body>
      <div id="react-view" dangerouslySetInnerHTML={{ __html: component }} />

      <script
        dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_STATE__=${serialize(store.getState())}`
        }}
        charSet="UTF-8"
      />

      <script src="/vendor.bundle.js" async />
      <script src="/main.bundle.js" async />

      { process.env.NODE_ENV === 'production' ? [
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js', { scope: './' }).then(reg => {
                  reg.onupdatefound = function () {
                    const installingWorker = reg.installing

                    installingWorker.onstatechange = function () {
                      switch (installingWorker.state) {
                        case 'installed':
                          if (navigator.serviceWorker.controller) {
                            console.log('New or updated content is available.')
                          } else {
                            console.log('Content is now available offline!')
                          }
                          break
                        case 'redundant':
                          console.log('The installing service worker became redundant.')
                          break
                        default:
                          break
                      }
                    }
                  }
                }).catch(e => {
                  console.error('Error during service worker registration:', e)
                })
              }
            `
          }}
        />,
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date
              ga('create', '${process.env.GANALYTICS}', 'auto')
              ga('send', 'pageview')
            `
          }}
        />,
        <script src="https://www.google-analytics.com/analytics.js" async />
      ] : '' }
    </body>
  </html>
)

const { shape, func, string, arrayOf } = PropTypes

Html.propTypes = {
  component: string,
  store: shape({ getState: func }),
  css: arrayOf(string)
}

export default Html
