import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAIL
} from '../constants'

export const loadPosts = () => ({
  types: [LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL],
  promise: client => client.get('/posts')
})
