import React from 'react'
import { Route, IndexRoute } from 'react-router/es6'

import { loadAuth } from './actions/auth'
import { loadPosts, loadPostsAndDrafts } from './actions/posts'

export default store => {
  function checkAuthentication (nextState, replace, callback) {
    if (!store.getState().auth.loaded) {
      return store.dispatch(loadAuth())
        .then(() => callback())
        .catch(() => callback())
    }

    return callback()
  }

  function onEditorEnter (nextState, replace, callback) {
    function checkAuth ({ user }) {
      if (!user) replace('/admin')

      if (!store.getState().posts.loadedPostsAndDrafts) {
        return store.dispatch(loadPostsAndDrafts())
          .then(() => callback())
          .catch(() => callback())
      }

      return callback()
    }

    if (!store.getState().auth.loaded) {
      return store.dispatch(loadAuth())
        .then(checkAuth)
        .catch(checkAuth)
    }

    return checkAuth(store.getState().auth)
  }

  function postMustExist (nextState, replace, callback) {
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

  function getPosts (nextState, replace, callback) {
    if (!store.getState().posts.loadedPosts) {
      return store.dispatch(loadPosts())
        .then(() => callback())
        .catch(() => callback())
    }

    return callback()
  }

  return (
    <Route
      getComponent={ (nextState, callback) => {
        System.import('./containers/AppView')
          .then(module => callback(null, module.default))
      } }
      onEnter={ checkAuthentication }
      path="/"
    >
      <IndexRoute
        getComponent={ (nextState, callback) => {
          System.import('./components/Home/Home')
            .then(module => callback(null, module.default))
        } }
        onEnter={ getPosts }
      />
      <Route
        getComponent={ (nextState, callback) => {
          System.import('./components/About/About')
            .then(module => callback(null, module.default))
        } }
        path="about"
      />
      <Route
        getComponent={ (nextState, callback) => {
          System.import('./components/Contact/Contact')
            .then(module => callback(null, module.default))
        } }
        path="contact"
      />
      <Route
        getComponent={ (nextState, callback) => {
          System.import('./containers/Post/Post')
            .then(module => callback(null, module.default))
        } }
        onEnter={ postMustExist }
        path="posts/:slug"
      />
      <Route path="admin">
        <IndexRoute
          getComponent={ (nextState, callback) => {
            System.import('./containers/SignIn')
              .then(module => callback(null, module.default))
          } }
        />
        <Route
          getComponent={ (nextState, callback) => {
            System.import('./containers/Editor')
              .then(module => callback(null, module.default))
          } }
          onEnter={ onEditorEnter }
          path="editor"
        />
      </Route>
      <Route
        getComponent={ (nextState, callback) => {
          System.import('./components/NotFound/NotFound')
            .then(module => callback(null, module.default))
        } }
        path="*"
        status="404"
      />
    </Route>
  )
}
