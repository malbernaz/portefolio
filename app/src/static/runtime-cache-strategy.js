/* eslint-disable wrap-iife, strict, no-param-reassign */

(function (global) {
  'use strict'

  global.toolbox.options.debug = true

  global.toolbox.precache([
    '/',
    '/about',
    '/contact',
    '/admin'
  ])

  global.toolbox.router.get('/(.*)', global.toolbox.fastest, {
    origin: /fonts\.gstatic\.com/,
    cache: {
      name: 'static-vendor-cache',
      maxEntries: 10
    }
  })

  global.toolbox.router.get('*/api/user/*', global.toolbox.networkOnly)

  global.toolbox.router.get('/*', global.toolbox.fastest)
})(self)
