/* eslint-disable wrap-iife, strict, no-param-reassign */

(global => {
  'use strict'

  const { toolbox } = global

  toolbox.precache([
    '/',
    '/about',
    '/contact',
    '/admin'
  ])

  toolbox.router.get('/(.*)', toolbox.fastest, {
    origin: /fonts\.gstatic\.com/,
    cache: {
      name: 'static-vendor-cache',
      maxEntries: 10
    }
  })

  toolbox.router.get('*/api/user/*', toolbox.networkOnly)

  toolbox.router.get('*/api/posts/*', toolbox.networkFirst)

  toolbox.router.get('*/api/postsanddrafts/*', toolbox.networkFirst)

  toolbox.router.get('/*', toolbox.fastest)
})(self)
