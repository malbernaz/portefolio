/* eslint-disable no-console */

import serviceWorker from './service-worker'
import { showMessage } from './actions/message'

export default function registerServiceWorker (store) {
  serviceWorker({ scope: '/' }).then(registration => {
    registration.onupdatefound = () => { // eslint-disable-line no-param-reassign
      const installingWorker = registration.installing

      installingWorker.onstatechange = function onSwChange () {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            store.dispatch(showMessage('new update has been found'))
          } else {
            store.dispatch(showMessage('content is now available offline'))
          }
        }
      }
    }
  }).catch(error => {
    console.error('error during service worker registration:', error)
  })
}
