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

// async
export const loadPostsAndDrafts = () => ({
  types: [LOAD_POSTS_AND_DRAFTS, LOAD_POSTS_AND_DRAFTS_SUCCESS, LOAD_POSTS_AND_DRAFTS_FAIL],
  promise: client => client.get('/postsanddrafts')
})

export const loadPosts = () => ({
  types: [LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL],
  promise: client => client.get('/posts')
})

export const updatePost = data => ({
  types: [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAIL],
  promise: client => client.patch(`/posts/${data.slug}`, { data: { ...data } })
})

export const deletePost = _id => ({
  types: [DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAIL],
  promise: client => client.del(`/posts/${_id}`)
})

export const publish = data => ({
  types: [PUBLISH, PUBLISH_SUCCESS, PUBLISH_FAIL],
  promise: client => client.post('/posts', { data: { ...data } })
})

export const unpublish = data => ({
  types: [UNPUBLISH, UNPUBLISH_SUCCESS, UNPUBLISH_FAIL],
  promise: client => client.put(`/posts/unpublish/${data.slug}`, { data: { ...data } })
})

export const loadDrafts = () => ({
  types: [LOAD_DRAFTS, LOAD_DRAFTS_SUCCESS, LOAD_DRAFTS_FAIL],
  promise: client => client.get('/drafts')
})

export const saveDraft = data => ({
  types: [SAVE_DRAFT, SAVE_DRAFT_SUCCESS, SAVE_DRAFT_FAIL],
  promise: client => client.post('/drafts', { data: { ...data } })
})

export const updateDraft = data => ({
  types: [UPDATE_DRAFT, UPDATE_DRAFT_SUCCESS, UPDATE_DRAFT_FAIL],
  promise: client => client.patch(`/drafts/${data.slug}`, { data: { ...data } })
})

export const deleteDraft = _id => ({
  types: [DELETE_DRAFT, DELETE_DRAFT_SUCCESS, DELETE_DRAFT_FAIL],
  promise: client => client.del(`/drafts/${_id}`)
})


// sync
export const createActiveDraft = newActiveDraft => ({
  type: CREATE_ACTIVE_DRAFT,
  activeDraft: { ...newActiveDraft }
})

export const updateActiveDraft = data => ({
  type: UPDATE_ACTIVE_DRAFT,
  activeDraft: { ...data }
})
