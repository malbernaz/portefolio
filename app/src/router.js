import React from 'react'
import { IndexRoute, Route } from 'react-router'
import { reduce } from 'underscore'

import { isLoaded as isAuthLoaded, loadAuth } from './actions/auth'
import { loadPosts, loadPostsAndDrafts } from './actions/posts'
import { AppView, Editor, SignIn, Post } from './containers'
import { About, Contact, Home, NotFound } from './components'

export default store => {
  const mustBeLogged = (nextState, replace, callback) => {
    function checkAuth() {
      const { auth: { user } } = store.getState()
      if (!user) replace('/admin')
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

    if (!getPosts()) {
      return store.dispatch(loadPosts())
        .then(checkIfExists)
        .catch(checkIfExists)
    }

    return checkIfExists()
  }

  const getDrafts = (nextState, replace, callback) => {
    const findDrafts = () => {
      const { posts: { drafts } } = store.getState()
      return drafts || false
    }

    if (!findDrafts()) {
      return store.dispatch(loadPostsAndDrafts())
        .then(() => callback())
        .catch(() => callback())
    }

    return callback()
  }

  return (
    <Route name="app" component={ AppView } path="/">
      <IndexRoute component={ Home } />

      <Route path="posts">
        <Route path=":slug" onEnter={ postMustExist } component={ Post } />
      </Route>

      <Route component={ About } path="about" />
      <Route component={ Contact } path="contact" />

      <Route name="admin" path="admin">
        <IndexRoute component={ SignIn } />
        <Route onEnter={ mustBeLogged } path="editor">
          <IndexRoute onEnter={ getDrafts } component={ Editor } />
        </Route>
      </Route>

      <Route path="*" component={ NotFound } status="404" />
    </Route>
  )
}
