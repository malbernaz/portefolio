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

export const loadPosts = () => ({
  types: [LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL],
  promise: client => client.get('/posts')
})

export const editPost = ({ raw, meta, html, slug }) => ({
  types: [EDIT_POST, EDIT_POST_SUCCESS, EDIT_POST_FAIL],
  promise: client => client.put(`/posts/${slug}`, { data: { raw, meta, html } })
})

export const deletePost = slug => ({
  types: [DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAIL],
  promise: client => client.del(`/posts/${slug}`)
})

export const createDraft = ({ raw, meta, html, slug }) => ({
  type: CREATE_DRAFT,
  draft: { raw, meta, html, slug }
})

export const updateDraft = ({ raw, meta, html }) => ({
  type: UPDATE_DRAFT,
  draft: { raw, meta, html }
})

export const publishDraft = ({ raw, meta, html }) => ({
  types: [PUBLISH_DRAFT, PUBLISH_DRAFT_SUCCESS, PUBLISH_DRAFT_FAIL],
  promise: client => client.post('/posts', { data: { raw, meta, html } })
})
