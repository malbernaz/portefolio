import React from 'react'
import { IndexRoute, Route, Redirect } from 'react-router'

import { loadAuth } from './actions/auth'
import { loadPosts, loadPostsAndDrafts } from './actions/posts'
import { AppView, Editor, SignIn, Post } from './containers'
import { About, Contact, Home, NotFound } from './components'

export default store => {
  const mustBeLogged = (nextState, replace, callback) => {
    function checkAuth ({ user }) {
      if (!user) replace('/admin')

      return callback()
    }

    if (!store.getState().auth.loaded) {
      return store.dispatch(loadAuth())
        .then(checkAuth)
        .catch(checkAuth)
    }

    return checkAuth(store.getState().auth)
  }

  const postMustExist = (nextState, replace, callback) => {
    const slug = nextState.params.slug

    function checkIfExists ({ posts }) {
      if (!posts.some(p => slug === p.slug)) replace('/pagenotfound')

      return callback()
    }

    if (!store.getState().posts.loadedPosts) {
      return store.dispatch(loadPosts())
        .then(checkIfExists)
        .catch(checkIfExists)
    }

    return checkIfExists(store.getState().posts)
  }

  const getDrafts = (nextState, replace, callback) => {
    if (!store.getState().posts.loadedPostsAndDrafts) {
      return store.dispatch(loadPostsAndDrafts())
        .then(() => callback())
        .catch(e => callback(e))
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

      <Route path="pagenotfound" component={ NotFound } />
      <Redirect from="*" status="404" to="pagenotfound" />
    </Route>
  )
}
