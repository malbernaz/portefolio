/* eslint-disable wrap-iife, strict, no-param-reassign */

(global => {
  'use strict'

  const { toolbox } = global

  toolbox.options.debug = true

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

  toolbox.router.any('*/api/user/*', toolbox.networkOnly)

  toolbox.router.get('*/api/posts/*', toolbox.fastest)
  toolbox.router.post('*/api/posts/*', toolbox.networkOnly)
  toolbox.router.put('*/api/posts/*', toolbox.networkOnly)
  toolbox.router.delete('*/api/posts/*', toolbox.networkOnly)

  toolbox.router.any('*/api/drafts/*', toolbox.networkOnly)

  toolbox.router.get('*/api/postsanddrafts/*', toolbox.networkOnly)
})(self)
