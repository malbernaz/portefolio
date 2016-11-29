/* eslint-disable wrap-iife, strict, no-param-reassign */

(global => {
  'use strict'

  global.toolbox.precache([
    'https://malbernaz.me/',
    'https://malbernaz.me/about',
    'https://malbernaz.me/contact',
    'https://malbernaz.me/notfound',
    'https://malbernaz.me/admin'
  ])

  global.toolbox.router.get('/(.*)', global.toolbox.fastest, {
    origin: /fonts\.gstatic\.com/,
    cache: { name: 'static-vendor-cache', maxEntries: 10 }
  })

  global.toolbox.router.get('/(.*)', global.toolbox.fastest)

  global.toolbox.router.any('*/api/user/*', global.toolbox.networkOnly)

  global.toolbox.router.get('*/api/posts/*', global.toolbox.fastest)
  global.toolbox.router.post('*/api/posts/*', global.toolbox.networkOnly)
  global.toolbox.router.put('*/api/posts/*', global.toolbox.networkOnly)
  global.toolbox.router.delete('*/api/posts/*', global.toolbox.networkOnly)

  global.toolbox.router.any('*/api/drafts/*', global.toolbox.networkOnly)

  global.toolbox.router.get('*/api/postsanddrafts/*', global.toolbox.networkOnly)
})(self)
