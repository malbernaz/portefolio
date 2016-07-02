import {
  LOAD_POSTS_AND_DRAFTS,
  LOAD_POSTS_AND_DRAFTS_SUCCESS,
  LOAD_POSTS_AND_DRAFTS_FAIL,
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

const reducer = (state = {}, action = {}) => {
  // load posts and drafts
  switch (action.type) {
    case LOAD_POSTS_AND_DRAFTS:
      return {
        ...state,
        loadingPostsAndDrafts: true
      }
    case LOAD_POSTS_AND_DRAFTS_SUCCESS:
      return {
        ...state,
        loadingPostsAndDrafts: false,
        loadedPostsAndDrafts: true,
        status: action.result.message,
        posts: action.result.posts ? action.result.posts
          .map(p => ({ ...p, isPublished: true, isSaved: true })) : [],
        drafts: action.result.drafts ? action.result.drafts
          .map(p => ({ ...p, isPublished: false, isSaved: true })) : [],
        activeDraft: action.result.drafts.length > 0 ?
          { ...action.result.drafts[0], isPublished: false, isSaved: true } :
          defaultDraft
      }
    case LOAD_POSTS_AND_DRAFTS_FAIL:
      return {
        ...state,
        loadingPostsAndDrafts: false,
        loadedPostsAndDrafts: false,
        status:
          Object.keys(action.error) !== 0 ?
            action.error :
            'unathorized',
        posts: state.posts || [],
        drafts: state.drafts || []
      }

    // load posts
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
        posts: action.result.posts ? action.result.posts
          .map(p => ({ ...p, isPublished: true, isSaved: true })) : [],
      }
    case LOAD_POSTS_FAIL:
      return {
        ...state,
        loadingPosts: false,
        loadedPosts: false,
        status: Object.keys(action.error) !== 0 ? action.error : 'unathorized',
        posts: state.posts || []
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
        activeDraft: state.drafts[0] || defaultDraft
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
          isPublished: action.activeDraft.isPublished || false,
          isSaved: action.activeDraft.isSaved || false
        }
      }
    case UPDATE_DRAFT:
      return {
        ...state,
        activeDraft: action.activeDraft
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
        activeDraft: state.drafts[0] || defaultDraft
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
        activeDraft: state.drafts[0] || defaultDraft
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
        drafts: action.result.drafts ? action.result.drafts
          .map(p => ({ ...p, isPublished: false, isSaved: true })) : [],
        activeDraft: action.result.drafts.length > 0 ?
          { ...action.result.drafts[0], isPublished: false, isSaved: true } :
          defaultDraft
      }
    case LOAD_DRAFTS_FAIL:
      return {
        ...state,
        loadingDrafts: false,
        loadedDrafts: false,
        status: action.error.message,
        drafts: state.drafts || []
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
        activeDraft: state.drafts[0] || defaultDraft
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
