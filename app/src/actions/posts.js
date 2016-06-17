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

export const createDraft = (raw, meta, html) => ({
  type: CREATE_DRAFT,
  draft: {
    raw,
    meta,
    html
  }
})

export const updateDraft = (raw, meta, html) => ({
  type: UPDATE_DRAFT,
  draft: {
    raw,
    meta,
    html
  }
})

export const publishDraft = ({ raw, meta: { title, subtitle, tags } }) => ({
  types: [PUBLISH_DRAFT, PUBLISH_DRAFT_SUCCESS, PUBLISH_DRAFT_FAIL],
  promise: client => client.post('/posts', { data: { raw, title, subtitle, tags } })
})
