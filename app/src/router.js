import React from 'react'
import { IndexRoute, Route } from 'react-router'

import {
  isLoaded as isAuthLoaded,
  load as loadAuth
} from './actions/auth'

import {
  AppView,
  Home
} from './components'

export default store => {
  const mustBeLogged = (nextState, replace, callback) => { // eslint-disable-line
    function checkAuth() {
      const { auth: { user } } = store.getState()
      if (!user) replace('/')
      callback()
    }

    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth())
        .then(checkAuth)
        .catch(checkAuth)
    }
    return checkAuth()
  }

  return (
    <Route name="app" component={AppView} path="/">
      <IndexRoute component={Home} />
    </Route>
  )
}
