import React from 'react'
import { IndexRoute, Route } from 'react-router'
import { reduce } from 'underscore'
import marked from 'meta-marked'

import { isLoaded as isAuthLoaded, loadAuth } from './actions/auth'

import { loadPosts, createDraft } from './actions/posts'

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

    if (!posts) {
      return store.dispatch(loadPosts())
          .then(checkIfExists)
          .catch(checkIfExists)
    }
    return checkIfExists()
  }

  const loadDraft = (nextState, replace, callback) => {
    const { posts: { draft } } = store.getState()

    const raw = [
      '---',
      'title: my post title',
      'subtitle: a subtle subtitle',
      'tags:',
      '  - a tag',
      '  - open source',
      '---\n'
    ].join('\n')

    const { meta, html } = marked(raw)

    if (!draft) {
      store.dispatch(createDraft(raw, meta, html))
    }

    return callback()
  }

  return (
    <Route name="app" component={AppView} path="/">
      <IndexRoute component={Home} />
      <Route component={About} path="about" />
      <Route component={Contact} path="contact" />

      <Route name="posts" path="/posts">
        <IndexRoute component={Posts} />
        <Route path=":slug" onEnter={postMustExist} component={Post} />
      </Route>

      <Route name="admin" path="admin">
        <Route component={SignIn} path="signin" />
        <Route onEnter={mustBeLogged}>
          <IndexRoute onEnter={loadDraft} component={Admin} />
        </Route>
      </Route>
    </Route>
  )
}
