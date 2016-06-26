import React from 'react'
import { IndexRoute, Route } from 'react-router'
import { reduce } from 'underscore'

import { isLoaded as isAuthLoaded, loadAuth } from './actions/auth'

import { loadPosts, createDraft } from './actions/posts'

import defaultDraft from './helpers/defaultDraft'

import {
  About,
  Admin,
  AppView,
  Contact,
  Home,
  Post,
  Posts,
  SignIn
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

    const getPosts = () => {
      const { posts: { posts } } = store.getState()
      return posts || false
    }

    function checkIfExists() {
      const existent = reduce(getPosts(), (p, n) => {
        if (slug === n.slug || p === true) {
          return true
        }
        return false
      }, false)

      if (!existent) {
        replace('/')
        return callback()
      }

      return callback()
    }

    if (getPosts() === false) {
      return store.dispatch(loadPosts())
        .then(checkIfExists)
        .catch(checkIfExists)
    }

    return checkIfExists()
  }

  const loadDraft = (nextState, replace, callback) => {
    const { posts: { activeDraft } } = store.getState()

    if (!activeDraft) store.dispatch(createDraft(defaultDraft))

    return callback()
  }

  return (
    <Route name="app" component={ AppView } path="/">
      <IndexRoute component={ Home } />
      <Route component={ About } path="about" />
      <Route component={ Contact } path="contact" />

      <Route name="posts" path="/posts">
        <IndexRoute component={ Posts } />
        <Route path=":slug" onEnter={ postMustExist } component={ Post } />
      </Route>

      <Route name="admin" path="admin">
        <Route component={ SignIn } path="signin" />
        <Route onEnter={ mustBeLogged }>
          <IndexRoute onEnter={ loadDraft } component={ Admin } />
        </Route>
      </Route>
    </Route>
  )
}
