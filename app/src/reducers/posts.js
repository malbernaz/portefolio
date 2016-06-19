import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAIL,
  CREATE_DRAFT,
  UPDATE_DRAFT,
  PUBLISH_DRAFT,
  PUBLISH_DRAFT_SUCCESS,
  PUBLISH_DRAFT_FAIL
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
      return {
        ...state,
        draft: {
          raw: action.draft.raw,
          meta: action.draft.meta,
          html: action.draft.html,
          slug: action.draft.slug || null
        }
      }
    case UPDATE_DRAFT:
      return {
        ...state,
        draft: {
          raw: action.draft.raw,
          meta: action.draft.meta,
          html: action.draft.html
        }
      }
    case PUBLISH_DRAFT:
      return {
        ...state,
        publishing: true
      }
    case PUBLISH_DRAFT_SUCCESS:
      return {
        ...state,
        publishing: false,
        published: true,
        status: action.result.status.message
      }
    case PUBLISH_DRAFT_FAIL:
      return {
        ...state,
        publishing: false,
        published: false,
        status: action.result.status.message
      }
    default:
      return state
  }
}

export default reducer
