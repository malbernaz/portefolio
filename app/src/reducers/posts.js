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

const initialState = {
  posts: [],
  drafts: []
}

const format = (data, isPost = true) =>
  data instanceof Array ?
    data.map(d => ({ ...d, isPublished: isPost, isSaved: true }))
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) :
    ({ ...data, isPublished: isPost, isSaved: true })


export default (state = initialState, action = {}) => {
  // load posts and drafts
  switch (action.type) {
    case LOAD_POSTS_AND_DRAFTS:
      return {
        ...state,
        loadingPostsAndDrafts: true
      }
    case LOAD_POSTS_AND_DRAFTS_SUCCESS: {
      const posts = format(action.result.posts)
      const drafts = format(action.result.drafts, false)

      return {
        ...state,
        loadingPostsAndDrafts: false,
        loadedPostsAndDrafts: true,
        status: action.result.message,
        posts,
        drafts,
        activeDraft: drafts.length > 0 ? drafts[0] : defaultDraft
      }
    }
    case LOAD_POSTS_AND_DRAFTS_FAIL:
      return {
        ...state,
        loadingPostsAndDrafts: false,
        loadedPostsAndDrafts: false,
        status: Object.keys(action.error).length > 0 ? action.error.message : 'unathorized'
      }

    // load posts
    case LOAD_POSTS:
      return {
        ...state,
        loadingPosts: true
      }
    case LOAD_POSTS_SUCCESS: {
      const posts = format(action.result.posts)

      return {
        ...state,
        loadingPosts: false,
        loadedPosts: true,
        status: action.result.message,
        posts,
      }
    }
    case LOAD_POSTS_FAIL:
      return {
        ...state,
        loadingPosts: false,
        loadedPosts: false,
        status: Object.keys(action.error).length > 0 ?
          action.error.message : 'failed to load posts'
      }

    // update post
    case UPDATE_POST:
      return {
        ...state,
        updatingPost: true
      }
    case UPDATE_POST_SUCCESS: {
      const post = format(action.result.post)

      return {
        ...state,
        updatingPost: false,
        updatedPost: true,
        status: action.result.message,
        posts: state.posts.map(p => p._id === post._id ? post : p),
        activeDraft: post
      }
    }
    case UPDATE_POST_FAIL:
      return {
        ...state,
        updatingPost: false,
        updatedPost: false,
        status: Object.keys(action.error).length > 0 ?
          action.error.message : 'unauthorized'
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
        posts: state.posts.filter(p => p._id !== action.result.post._id),
        activeDraft: state.drafts.length > 0 ? state.drafts[0] : defaultDraft
      }
    case DELETE_POST_FAIL:
      return {
        ...state,
        deletingPost: false,
        deletedPost: false,
      }

    // create or update local active draft
    case CREATE_ACTIVE_DRAFT:
      return {
        ...state,
        activeDraft: action.activeDraft || defaultDraft
      }
    case UPDATE_ACTIVE_DRAFT:
      return {
        ...state,
        activeDraft: {
          ...state.activeDraft,
          ...action.activeDraft,
          meta: {
            ...state.activeDraft.meta,
            ...action.activeDraft.meta
          }
        }
      }

    // publish active draft
    case PUBLISH:
      return {
        ...state,
        publishing: true
      }
    case PUBLISH_SUCCESS: {
      const post = format(action.result.post)
      const drafts = state.drafts.filter(d => d._id !== post._id)

      return {
        ...state,
        publishing: false,
        published: true,
        status: action.result.message,
        posts: [...state.posts, post],
        drafts,
        activeDraft: drafts.length > 0 ? drafts[0] : defaultDraft
      }
    }
    case PUBLISH_FAIL:
      return {
        ...state,
        publishing: false,
        published: false,
        status: Object.keys(action.error).length > 0 ?
          action.error.message : 'unauthorized'
      }

    // unpublish post (becomes draft)
    case UNPUBLISH:
      return {
        ...state,
        unpublishing: true
      }
    case UNPUBLISH_SUCCESS: {
      const draft = format(action.result.draft, false)
      const drafts = format([...state.drafts, draft], false)

      return {
        ...state,
        unpublishing: false,
        unpublished: true,
        status: action.result.message,
        posts: state.posts.filter(p => p._id !== draft._id),
        drafts,
        activeDraft: draft
      }
    }
    case UNPUBLISH_FAIL:
      return {
        ...state,
        unpublishing: false,
        unpublished: false,
        status: Object.keys(action.error).length > 0 ?
          action.error.message : 'unauthorized'
      }

    // load drafts
    case LOAD_DRAFTS:
      return {
        ...state,
        loadingDrafts: true
      }
    case LOAD_DRAFTS_SUCCESS: {
      const drafts = format(action.result.drafts, false)

      return {
        ...state,
        loadingDrafts: false,
        loadedDrafts: true,
        status: action.result.message,
        drafts,
        activeDraft: drafts.length > 0 ? drafts[0] : defaultDraft
      }
    }
    case LOAD_DRAFTS_FAIL:
      return {
        ...state,
        loadingDrafts: false,
        loadedDrafts: false,
        status: Object.keys(action.error).length > 0 ? action.error.message : 'unathorized'
      }

    // save draft remotely
    case SAVE_DRAFT:
      return {
        ...state,
        savingDraft: true
      }
    case SAVE_DRAFT_SUCCESS: {
      const drafts = format([...state.drafts, action.result.draft], false)

      return {
        ...state,
        savingDraft: false,
        savedDraft: true,
        status: action.result.message,
        drafts,
        activeDraft: drafts.filter(d => d._id === action.result.draft._id)[0]
      }
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
    case UPDATE_DRAFT_SUCCESS: {
      const draft = format(action.result.draft, false)
      const drafts = format(state.drafts.map(d => d._id === draft._id ? draft : d), false)

      return {
        ...state,
        updatingDraft: false,
        updatedDraft: true,
        status: action.result.message,
        drafts,
        activeDraft: draft
      }
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
    case DELETE_DRAFT_SUCCESS: {
      const drafts = state.drafts.filter(d => d._id !== action.result.draft._id)

      return {
        ...state,
        deletingDraft: false,
        deletedDraft: true,
        status: action.result.message,
        drafts,
        activeDraft: drafts.length > 0 ? drafts[0] : defaultDraft
      }
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
