/* eslint-disable wrap-iife, strict */

(function (global) {
  'use strict'

  global.toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    origin: /fonts\.gstatic\.com/,
    cache: {
      name: 'static-vendor-cache-v1',
      maxEntries: 10
    }
  })

  global.toolbox.router.get('*/loadauth', global.toolbox.networkOnly)

  global.toolbox.router.get('/*', global.toolbox.fastest)
})(self)
