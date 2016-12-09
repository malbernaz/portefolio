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
      if (!posts.some(p => slug === p.slug)) replace('/notfound')

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

  return {
    getComponent: (nextState, callback) => {
      require.ensure([], require => {
        callback(null, require('./containers/AppView').default)
      }, 'appview')
    },
    onEnter: checkAuthentication,
    path: '/',
    indexRoute: {
      getComponent: (nextState, callback) => {
        require.ensure([], require => {
          callback(null, require('./components/Home/Home').default)
        }, 'home')
      },
      onEnter: getPosts
    },
    childRoutes: [{
      getComponent: (nextState, callback) => {
        require.ensure([], require => {
          callback(null, require('./components/About/About').default)
        }, 'about')
      },
      path: 'about'
    }, {
      getComponent: (nextState, callback) => {
        require.ensure([], require => {
          callback(null, require('./components/Contact/Contact').default)
        }, 'contact')
      },
      path: 'contact'
    }, {
      getComponen: (nextState, callback) => {
        require.ensure([], require => {
          callback(null, require('./containers/Post/Post').default)
        }, 'post')
      },
      onEnter: postMustExist,
      path: 'posts/:slug'
    }, {
      path: 'admin',
      indexRoute: {
        getComponent: (nextState, callback) => {
          require.ensure([], require => {
            callback(null, require('./containers/SignIn').default)
          }, 'admin-signin')
        }
      },
      childRoutes: [{
        getComponent: (nextState, callback) => {
          require.ensure([], require => {
            callback(null, require('./containers/Editor').default)
          }, 'admin-editor')
        },
        onEnter: onEditorEnter,
        path: 'editor'
      }]
    }, {
      getComponent: (nextState, callback) => {
        require.ensure([], require => {
          callback(null, require('./components/NotFound/NotFound').default)
        }, 'notfound')
      },
      path: 'notfound'
    }]
  }
}
