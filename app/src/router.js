import React from 'react'
import { IndexRoute, Route } from 'react-router'

import {
  isLoaded as isAuthLoaded,
  loadAuth
} from './actions/auth'

import {
  AppView,
  Home,
  About,
  Contact,
  SignIn,
  Admin
} from './components'

export default store => {
  const mustBeLogged = (nextState, replace, callback) => {
    function checkAuth() {
      const { auth: { user } } = store.getState()
      if (!user) replace('/admin/signin')
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
      <Route component={About} path="about" />
      <Route component={Contact} path="contact" />

      <Route name="admin" path="admin">
        <Route component={SignIn} path="signin" />
        <Route onEnter={mustBeLogged}>
          <IndexRoute component={Admin} />
        </Route>
      </Route>
    </Route>
  )
}
