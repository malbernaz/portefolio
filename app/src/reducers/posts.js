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
  PUBLISH,
  PUBLISH_SUCCESS,
  PUBLISH_FAIL,
  UNPUBLISH,
  UNPUBLISH_SUCCESS,
  UNPUBLISH_FAIL,
  LOAD_DRAFTS,
  LOAD_DRAFTS_SUCCESS,
  LOAD_DRAFTS_FAIL,
  SAVE_DRAFT,
  SAVE_DRAFT_SUCCESS,
  SAVE_DRAFT_FAIL,
  DELETE_DRAFT,
  DELETE_DRAFT_SUCCESS,
  DELETE_DRAFT_FAIL,
} from '../constants'

import defaultDraft from '../helpers/defaultDraft'

const reducer = (state = { loadedPosts: false }, action = {}) => {
  // load Posts
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        loadingPosts: true
      }
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loadingPosts: false,
        loadedPosts: true,
        status: action.result.message,
        posts: action.result.posts
      }
    case LOAD_POSTS_FAIL:
      return {
        ...state,
        loadingPosts: false,
        loadedPosts: false,
        status:
          Object.keys(action.error) !== 0 ?
            action.error :
            'unathorized'
      }

    // edit post
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
        status: action.result.message,
        activeDraft: defaultDraft
      }
    case EDIT_POST_FAIL:
      return {
        ...state,
        editingPost: false,
        editedPost: false,
        status: action.error.message
      }

    // delete post
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
        activeDraft: defaultDraft
      }
    case DELETE_POST_FAIL:
      return {
        ...state,
        deletingPost: false,
        deletedPost: true,
      }

    // create or update local activeDraft
    case CREATE_DRAFT:
      return {
        ...state,
        activeDraft: {
          ...action.activeDraft,
          slug: action.activeDraft.slug || null
        }
      }
    case UPDATE_DRAFT:
      return {
        ...state,
        activeDraft: {
          ...action.activeDraft,
          slug: state.activeDraft.slug
        }
      }

    // publish active draft
    case PUBLISH:
      return {
        ...state,
        publishing: true
      }
    case PUBLISH_SUCCESS:
      return {
        ...state,
        publishing: false,
        published: true,
        status: action.result.message,
        activeDraft: defaultDraft
      }
    case PUBLISH_FAIL:
      return {
        ...state,
        publishing: false,
        published: false,
        status: action.error.message
      }

    // unpublish post (becomes draft)
    case UNPUBLISH:
      return {
        ...state,
        unpublishing: true
      }
    case UNPUBLISH_SUCCESS:
      return {
        ...state,
        unpublishing: false,
        unpublished: true,
        status: action.result.message,
      }
    case UNPUBLISH_FAIL:
      return {
        ...state,
        unpublishing: false,
        unpublished: false,
        status: action.error.message
      }

    // load drafts
    case LOAD_DRAFTS:
      return {
        ...state,
        loadingDrafts: true
      }
    case LOAD_DRAFTS_SUCCESS:
      return {
        ...state,
        loadingDrafts: false,
        loadedDrafts: true,
        status: action.result.message,
        drafts: action.result.drafts
      }
    case LOAD_DRAFTS_FAIL:
      return {
        ...state,
        loadingDrafts: false,
        loadedDrafts: false,
        status: action.error.message
      }

    // save activeDraft remotely
    case SAVE_DRAFT:
      return {
        ...state,
        savingDraft: true
      }
    case SAVE_DRAFT_SUCCESS:
      return {
        ...state,
        savingDraft: false,
        savedDraft: true,
        status: action.result.message,
        drafts: action.result.drafts
      }
    case SAVE_DRAFT_FAIL:
      return {
        ...state,
        savingDraft: false,
        savedDraft: false,
        status: action.error.message
      }

    // delete activeDraft
    case DELETE_DRAFT:
      return {
        ...state,
        deletingDraft: true
      }
    case DELETE_DRAFT_SUCCESS:
      return {
        ...state,
        deletingDraft: false,
        deletedDraft: true,
        status: action.result.message,
      }
    case DELETE_DRAFT_FAIL:
      return {
        ...state,
        deletingDraft: false,
        deletedDraft: false,
        status: action.error.message
      }

    default:
      return state
  }
}

export default reducer
