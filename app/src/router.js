import { AppView, Post } from './containers'
import { Home, About, Contact, NotFound } from './components'
import { loadAuth } from './actions/auth'
import { loadPosts, loadPostsAndDrafts } from './actions/posts'

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

  return {
    component: AppView,
    path: '/',
    indexRoute: { component: Home },
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
        getComponent: (location, cb) =>
          System.import('./containers')
            .then(({ SignIn }) => cb(null, SignIn))
      },
      childRoutes: [{
        path: 'editor',
        getComponent: (location, cb) =>
          System.import('./containers')
            .then(({ Editor }) => cb(null, Editor)),
        onEnter: mustBeLogged && getDrafts,
      }]
    }, {
      path: 'pagenotfound',
      component: NotFound
    }],
    redirect: {
      from: '*',
      status: '404',
      to: 'pagenotfound',
    }
  }
}
