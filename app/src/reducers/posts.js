import {
  CREATE_ACTIVE_DRAFT,
  DELETE_DRAFT_FAIL,
  DELETE_DRAFT_SUCCESS,
  DELETE_DRAFT,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST,
  LOAD_DRAFTS_FAIL,
  LOAD_DRAFTS_SUCCESS,
  LOAD_DRAFTS,
  LOAD_POSTS_AND_DRAFTS_FAIL,
  LOAD_POSTS_AND_DRAFTS_SUCCESS,
  LOAD_POSTS_AND_DRAFTS,
  LOAD_POSTS_FAIL,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS,
  PUBLISH_FAIL,
  PUBLISH_SUCCESS,
  PUBLISH,
  SAVE_DRAFT_FAIL,
  SAVE_DRAFT_SUCCESS,
  SAVE_DRAFT,
  UNPUBLISH_FAIL,
  UNPUBLISH_SUCCESS,
  UNPUBLISH,
  UPDATE_ACTIVE_DRAFT,
  UPDATE_DRAFT_FAIL,
  UPDATE_DRAFT_SUCCESS,
  UPDATE_DRAFT,
  UPDATE_POST_FAIL,
  UPDATE_POST_SUCCESS,
  UPDATE_POST
} from '../constants'

import defaultDraft from '../helpers/defaultDraft'

const withAditionalFields = (data, isPost = true) => data instanceof Array ?
  data.map(d => ({ ...d, isPublished: isPost, isSaved: true })) :
  ({ ...data, isPublished: isPost, isSaved: true })

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
        posts: withAditionalFields(action.result.posts),
        drafts: withAditionalFields(action.result.drafts, false),
        activeDraft: action.result.drafts.length > 0 ?
          withAditionalFields(action.result.drafts.pop(), false) :
          defaultDraft
      }
    case LOAD_POSTS_AND_DRAFTS_FAIL:
      return {
        ...state,
        loadingPostsAndDrafts: false,
        loadedPostsAndDrafts: false,
        status: Object.keys(action.error).length > 0 ?
          action.error.message :
          'unathorized'
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
        posts: withAditionalFields(action.result.posts),
      }
    case LOAD_POSTS_FAIL:
      return {
        ...state,
        loadingPosts: false,
        loadedPosts: false,
        status: Object.keys(action.error).length > 0 ?
          action.error.message :
          'unathorized'
      }

    // update post
    case UPDATE_POST:
      return {
        ...state,
        updatingPost: true
      }
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        updatingPost: false,
        updatedPost: true,
        status: action.result.message,
        posts: state.posts.map(
          p => p._id === action.result.post._id ?
            withAditionalFields(action.result.post) : p)
      }
    case UPDATE_POST_FAIL:
      return {
        ...state,
        updatingPost: false,
        updatedPost: false,
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
        posts: state.posts.filter(p => p._id !== action.result.post._id)
      }
    case DELETE_POST_FAIL:
      return {
        ...state,
        deletingPost: false,
        deletedPost: true,
      }

    // create or update local active draft
    case CREATE_ACTIVE_DRAFT:
      return {
        ...state,
        activeDraft: Object.keys(action.activeDraft).length > 0 ?
          action.activeDraft :
          defaultDraft
      }
    case UPDATE_ACTIVE_DRAFT:
      return {
        ...state,
        activeDraft: { ...state.activeDraft, ...action.activeDraft }
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
        posts: [
          ...state.posts,
          withAditionalFields(action.result.post)
        ],
        drafts: state.drafts.filter(d => d._id !== action.result.post._id),
        activeDraft:
          state.drafts.filter(d => d._id !== action.result.post._id)[0] ||
          defaultDraft
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
        posts: state.posts.filter(p => p._id !== action.result.draft._id),
        drafts: [
          ...state.drafts,
          withAditionalFields(action.result.draft, false)
        ],
        activeDraft:
          state.drafts[0] ||
          withAditionalFields(action.result.draft, false) ||
          defaultDraft
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
        drafts: withAditionalFields(action.result.drafts, false),
        activeDraft: action.result.drafts.length > 0 ?
          withAditionalFields(action.result.drafts[0], false) :
          defaultDraft
      }
    case LOAD_DRAFTS_FAIL:
      return {
        ...state,
        loadingDrafts: false,
        loadedDrafts: false,
        status: Object.keys(action.error).length > 0 ?
          action.error.message :
          'unathorized'
      }

    // save draft remotely
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
        drafts: [
          ...state.draft,
          withAditionalFields(action.result.draft, false)
        ],
      }
    case SAVE_DRAFT_FAIL:
      return {
        ...state,
        savingDraft: false,
        savedDraft: false,
        status: action.error.message
      }

    // update post
    case UPDATE_DRAFT:
      return {
        ...state,
        updatingDraft: true
      }
    case UPDATE_DRAFT_SUCCESS:
      return {
        ...state,
        updatingDraft: false,
        updatedDraft: true,
        status: action.result.message,
        drafts: state.drafts.map(d =>
          d._id === action.result.draft._id ?
            withAditionalFields(action.result.draft, false) : d)
      }
    case UPDATE_DRAFT_FAIL:
      return {
        ...state,
        updatingDraft: false,
        updatedDraft: false,
        status: action.error.message
      }

    // delete draft
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
        drafts: state.drafts.filter(d => d._id !== action.result.draft._id),
        activeDraft:
          state.drafts.filter(d => d._id !== action.result.draft._id)[0] ||
          defaultDraft
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
