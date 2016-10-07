/* eslint-disable wrap-iife, strict */

(function (global) {
  'use strict'

  global.toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    origin: /\.(?:googleapis|gstatic|)\.com$/
  })

  global.toolbox.router.get('/*', global.toolbox.fastest)
})(self)
