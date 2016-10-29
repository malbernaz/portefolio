import AppView from './containers/AppView'
import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import NotFound from './components/NotFound/NotFound'
import Post from './containers/Post/Post'

import { loadAuth } from './actions/auth'
import { loadPosts, loadPostsAndDrafts } from './actions/posts'

export default store => {
  const onEditorEnter = (nextState, replace, callback) => {
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

  const getPosts = (nextState, replace, callback) => {
    if (!store.getState().posts.loadedPosts) {
      return store.dispatch(loadPosts())
        .then(() => callback())
        .catch(() => callback())
    }

    return callback()
  }

  return {
    component: AppView,
    path: '/',
    indexRoute: {
      component: Home,
      onEnter: getPosts
    },
    childRoutes: [{
      path: 'about',
      component: About
    }, {
      path: 'contact',
      component: Contact
    }, {
      path: 'posts/:slug',
      component: Post,
      onEnter: postMustExist
    }, {
      path: 'admin',
      indexRoute: {
        getComponent (nextState, callback) {
          System.import('./containers/SignIn')
            .then(module => callback(null, module.default))
        }
      },
      childRoutes: [{
        path: 'editor',
        getComponent (nextState, callback) {
          System.import('./containers/Editor')
            .then(module => callback(null, module.default))
        },
        onEnter: onEditorEnter,
      }]
    }, {
      path: '*',
      status: '404',
      component: NotFound,
    }]
  }
}
