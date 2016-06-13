import React from 'react'
import { IndexRoute, Route } from 'react-router'
import { reduce } from 'underscore'

import {
  isLoaded as isAuthLoaded,
  loadAuth
} from './actions/auth'

import { loadPosts } from './actions/posts'

import {
  AppView,
  Home,
  About,
  Contact,
  SignIn,
  Admin,
  Posts,
  Post
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

  const postMustExist = (nextState, replace, callback) => {
    const slug = nextState.params.slug
    const { posts: { posts } } = store.getState()

    function checkIfExists() {
      const { posts: { posts } } = store.getState() // eslint-disable-line no-shadow
      const existent = reduce(posts, (p, n) => {
        if (p === true) return p
        return n.slug === p
      }, slug)

      if (!existent) {
        replace('/')
        return callback()
      }

      return callback()
    }

    if (!posts) {
      return store.dispatch(loadPosts())
          .then(checkIfExists)
          .catch(checkIfExists)
    }
    return checkIfExists()
  }

  return (
    <Route name="app" component={AppView} path="/">
      <IndexRoute component={Home} />
      <Route component={About} path="about" />
      <Route component={Contact} path="contact" />

      <Route name="posts" path="/posts">
        <IndexRoute component={Posts} />
        <Route onEnter={postMustExist}>
          <Route path=":slug" component="post" component={Post} />
        </Route>
      </Route>

      <Route name="admin" path="admin">
        <Route component={SignIn} path="signin" />
        <Route onEnter={mustBeLogged}>
          <IndexRoute component={Admin} />
        </Route>
      </Route>
    </Route>
  )
}
