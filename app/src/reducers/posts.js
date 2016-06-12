import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAIL,
} from '../constants'

const reducer = (state = { loaded: false }, action = {}) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        loading: true
      }
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        status: action.result.status.message,
        posts: action.result.status.posts
      }
    case LOAD_POSTS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        status:
          Object.keys(action.error) !== 0 ?
            action.error :
            'unathorized'
      }
    default:
      return state
  }
}

export default reducer
