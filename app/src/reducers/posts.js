import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAIL,
  CREATE_DRAFT,
  UPDATE_DRAFT
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
    case CREATE_DRAFT:
    case UPDATE_DRAFT:
      return {
        ...state,
        raw: action.raw,
        title: action.title,
        html: action.html
      }
    default:
      return state
  }
}

export default reducer
