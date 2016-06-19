import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAIL,
  EDIT_POST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  CREATE_DRAFT,
  UPDATE_DRAFT,
  PUBLISH_DRAFT,
  PUBLISH_DRAFT_SUCCESS,
  PUBLISH_DRAFT_FAIL
} from '../constants'

import defaultDraft from '../helpers/defaultDraft'

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

    case EDIT_POST:
      return {
        ...state,
        editingPost: true
      }
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        editingPost: false,
        editedPost: true,
        status: action.result.status.message,
        draft: defaultDraft
      }
    case EDIT_POST_FAIL:
      return {
        ...state,
        editingPost: false,
        editedPost: false,
        status: action.result.status.message
      }

    case DELETE_POST:
      return {
        ...state,
        deletingPost: true
      }
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        deletingPost: false,
        deletedPost: true,
        draft: defaultDraft
      }
    case DELETE_POST_FAIL:
      return {
        ...state,
        deletingPost: false,
        deletedPost: true,
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
          html: action.draft.html,
          slug: state.draft.slug
        }
      }

    case PUBLISH_DRAFT:
      return {
        ...state,
        publishing: true
      }
    case PUBLISH_DRAFT_SUCCESS:
      console.log(action)
      return {
        ...state,
        publishing: false,
        published: true,
        status: action.result.status.message,
        draft: defaultDraft
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
