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
  PUBLISH_FAIL
} from '../constants'

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

export const createDraft = newActiveDraft => ({
  type: CREATE_DRAFT,
  activeDraft: { ...newActiveDraft }
})

export const updateDraft = data => ({
  type: UPDATE_DRAFT,
  activeDraft: { ...data }
})

export const publish = post => ({
  types: [PUBLISH, PUBLISH_SUCCESS, PUBLISH_FAIL],
  promise: client => client.post('/posts', { data: { ...post } })
})
