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

export const loadPosts = () => ({
  types: [LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL],
  promise: client => client.get('/posts')
})

export const createDraft = (raw, title, html) => ({
  type: CREATE_DRAFT,
  raw,
  title,
  html,
})

export const updateDraft = (raw, title, html) => ({
  type: UPDATE_DRAFT,
  raw,
  title,
  html,
})

export const publishDraft = ({ title, subtitle, body }) => ({
  types: [PUBLISH_DRAFT, PUBLISH_DRAFT_SUCCESS, PUBLISH_DRAFT_FAIL],
  promise: client => client.post('/posts', {
    data: { title, subtitle, body }
  })
})
