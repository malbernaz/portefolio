/* eslint-env worker */

importScripts('assets.js')

const VERSION = self.staticAssets.hash
const STATIC_ASSETS = self.staticAssets.assets
const STATIC_PAGES = ['/', '/about', '/contact', '/notfound']

const cachePage = (promise, cache, next) => promise
  .then(res => cache.put(new URL(res.url).pathname, res))
  .then(() => fetch(next))

function cachePages (cache) {
  return STATIC_PAGES.reduce((prev, next) => prev instanceof Promise ?
      cachePage(prev, cache, next) :
      cachePage(fetch(prev), cache, next)
    ).then(res =>
      cache.put(new URL(res.url).pathname, res)
    )
}

self.oninstall = event => event.waitUntil(
  caches.open(`static-${VERSION}`)
    .then(cache => cache.addAll([...STATIC_ASSETS]))
    .then(() => caches.open(`pages-${VERSION}`))
    .then(cachePages)
    .then(() => self.skipWaiting())
)

self.onactivate = event => event.waitUntil(
  caches.keys()
    .then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(cache => !new RegExp(VERSION).test(cache))
          .map(cache => caches.delete(cache))
      )
    )
    .then(() => self.clients.claim())
)

self.onfetch = event => {
  const requestUrl = new URL(event.request.url)

  const { pathname, href, origin } = requestUrl

  // Api Request
  if (/\/api\/user/.test(href)) {
    return event.respondWith(fetch(event.request))
  }

  // Webpack Hot Module Reloading
  if (process.env.NODE_ENV !== 'production' && /(hot-update|sockjs-node)/.test(href)) {
    return event.respondWith(fetch(requestUrl))
  }

  // Local Requests
  if (location.origin === origin) {
    // Server Rendered Pages
    if (STATIC_PAGES.some(s => s === pathname)) {
      return event.respondWith(
        caches.match(requestUrl, { ignoreSearch: true })
          .then(response => response.text())
          .then(responseText =>
            new Response(responseText, {
              headers: { 'Content-Type': 'text/html' }
            })
          )
      )
    }

    // Static Assets
    if (STATIC_ASSETS.some(s => new RegExp(s).test(pathname))) {
      return event.respondWith(caches.match(requestUrl, { ignoreSearch: true }))
    }
  }

  // Dynamic Requests
  const fetchedVersion = fetch(requestUrl)
  const fetchedCopy = fetchedVersion.then(response => response.clone())
  const cachedVersion = caches.match(requestUrl)

  event.respondWith(
    Promise.race([fetchedVersion.catch(() => cachedVersion), cachedVersion])
      .then(response => response || fetchedVersion)
      .catch(() => new Response(null, { status: 404 }))
  )

  let response
  return event.waitUntil(
    fetchedCopy
      .then(res => {
        response = res
        return caches.open(`dynamic-${VERSION}`)
      })
      .then(cache =>
        cache.put(requestUrl, response)
      )
  )
}
