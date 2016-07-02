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
  DELETE_DRAFT_FAIL
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

export const editPost = post => ({
  types: [EDIT_POST, EDIT_POST_SUCCESS, EDIT_POST_FAIL],
  promise: client => client.put(`/posts/${post.slug}`, { data: { ...post } })
})

export const deletePost = _id => ({
  types: [DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAIL],
  promise: client => client.del(`/posts/${_id}`)
})

export const publish = post => ({
  types: [PUBLISH, PUBLISH_SUCCESS, PUBLISH_FAIL],
  promise: client => client.post('/posts', { data: { ...post } })
})

export const unpublish = post => ({
  types: [UNPUBLISH, UNPUBLISH_SUCCESS, UNPUBLISH_FAIL],
  promise: client => client.put(`/posts/unpublish/${post.slug}`, { data: { ...post } })
})

export const loadDrafts = () => ({
  types: [LOAD_DRAFTS, LOAD_DRAFTS_SUCCESS, LOAD_DRAFTS_FAIL],
  promise: client => client.get('/drafts')
})

export const saveDraft = post => ({
  types: [SAVE_DRAFT, SAVE_DRAFT_SUCCESS, SAVE_DRAFT_FAIL],
  promise: client => client.post('/drafts', { data: { ...post } })
})

export const deleteDraft = _id => ({
  types: [DELETE_DRAFT, DELETE_DRAFT_SUCCESS, DELETE_DRAFT_FAIL],
  promise: client => client.del(`/drafts/${_id}`)
})


// sync
export const createDraft = newActiveDraft => ({
  type: CREATE_DRAFT,
  activeDraft: { ...newActiveDraft }
})

export const updateDraft = data => ({
  type: UPDATE_DRAFT,
  activeDraft: { ...data }
})
