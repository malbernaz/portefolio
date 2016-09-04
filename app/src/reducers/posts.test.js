import test from 'tape'

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
import reducer from './posts'

const initialState = { posts: [], drafts: [] }

test('posts reducer: returns state by default', t => {
  t.plan(1)

  t.deepEqual(reducer(), initialState)
})

test('posts reducer: LOAD_POSTS_AND_DRAFTS', t => {
  t.plan(1)

  const action = { type: LOAD_POSTS_AND_DRAFTS }

  t.deepEqual(reducer(initialState, action).loadingPostsAndDrafts, true)
})

test('posts reducer: LOAD_POSTS_AND_DRAFTS_SUCCESS', t => {
  t.plan(7)

  const action = {
    type: LOAD_POSTS_AND_DRAFTS_SUCCESS,
    result: { posts: [], drafts: [], message: 'success' }
  }

  const actionWithDraft = { ...action, result: { ...action.result, drafts: [{}] } }

  t.deepEqual(reducer(initialState, action).loadingPostsAndDrafts, false)
  t.deepEqual(reducer(initialState, action).loadedPostsAndDrafts, true)
  t.deepEqual(reducer(initialState, action).status, 'success')
  t.deepEqual(reducer(initialState, action).posts, [])
  t.deepEqual(reducer(initialState, action).drafts, [])
  t.deepEqual(reducer(initialState, action).activeDraft, defaultDraft)
  t.deepEqual(
    reducer(initialState, actionWithDraft).activeDraft, { isPublished: false, isSaved: true })
})

test('posts reducer: LOAD_POSTS_AND_DRAFTS_FAIL', t => {
  t.plan(4)

  const action = {
    type: LOAD_POSTS_AND_DRAFTS_FAIL,
    error: {}
  }

  t.deepEqual(reducer(initialState, action).loadingPostsAndDrafts, false)
  t.deepEqual(reducer(initialState, action).loadedPostsAndDrafts, false)
  t.deepEqual(reducer(initialState, action).status, 'unathorized')
  t.deepEqual(reducer(initialState, { ...action, error: { message: 'fail' } }).status, 'fail')
})

test('posts reducer: LOAD_POSTS', t => {
  t.plan(1)

  const action = { type: LOAD_POSTS }

  t.deepEqual(reducer(initialState, action).loadingPosts, true)
})

test('posts reducer: LOAD_POSTS_SUCCESS', t => {
  t.plan(4)

  const action = {
    type: LOAD_POSTS_SUCCESS,
    result: { posts: [], message: 'success' }
  }

  t.deepEqual(reducer(initialState, action).loadingPosts, false)
  t.deepEqual(reducer(initialState, action).loadedPosts, true)
  t.deepEqual(reducer(initialState, action).status, 'success')
  t.deepEqual(reducer(initialState, action).posts, [])
})

test('posts reducer: LOAD_POSTS_FAIL', t => {
  t.plan(4)

  const action = {
    type: LOAD_POSTS_FAIL,
    error: {}
  }

  t.deepEqual(reducer(initialState, action).loadingPosts, false)
  t.deepEqual(reducer(initialState, action).loadedPosts, false)
  t.deepEqual(reducer(initialState, action).status, 'failed to load posts')
  t.deepEqual(reducer(initialState, { ...action, error: { message: 'fail' } }).status, 'fail')
})

test('posts reducer: UPDATE_POST', t => {
  t.plan(1)

  const action = { type: UPDATE_POST }

  t.deepEqual(reducer(initialState, action).updatingPost, true)
})

test('posts reducer: UPDATE_POST_SUCCESS', t => {
  t.plan(5)

  const action = {
    type: UPDATE_POST_SUCCESS,
    result: { post: { _id: '123', title: 'new title' }, message: 'success' }
  }

  t.deepEqual(reducer(initialState, action).updatingPost, false)
  t.deepEqual(reducer(initialState, action).updatedPost, true)
  t.deepEqual(reducer(initialState, action).status, 'success')
  t.deepEqual(reducer({
    ...initialState,
    posts: [{ _id: '123', title: 'title' }]
  }, action).posts, [{ _id: '123', isPublished: true, isSaved: true, title: 'new title' }])
  t.deepEqual(reducer({
    ...initialState,
    posts: [{ _id: '123', title: 'title' }]
  }, action).activeDraft, { _id: '123', isPublished: true, isSaved: true, title: 'new title' })
})

test('posts reducer: UPDATE_POST_FAIL', t => {
  t.plan(4)

  const action = {
    type: UPDATE_POST_FAIL,
    error: {}
  }

  t.deepEqual(reducer(initialState, action).updatingPost, false)
  t.deepEqual(reducer(initialState, action).updatedPost, false)
  t.deepEqual(reducer(initialState, action).status, 'unauthorized')
  t.deepEqual(reducer(initialState, { ...action, error: { message: 'fail' } }).status, 'fail')
})

test('posts reducer: DELETE_POST', t => {
  t.plan(1)

  const action = { type: DELETE_POST }

  t.deepEqual(reducer(initialState, action).deletingPost, true)
})

test('posts reducer: DELETE_POST_SUCCESS', t => {
  t.plan(6)

  const stateWithPosts = { ...initialState, posts: [{ _id: '123' }] }

  const stateWithDrafts = { ...stateWithPosts, drafts: [{}] }

  const action = {
    type: DELETE_POST_SUCCESS,
    result: { post: { _id: '123' }, message: 'success' }
  }

  t.deepEqual(reducer(initialState, action).deletingPost, false)
  t.deepEqual(reducer(initialState, action).deletedPost, true)
  t.deepEqual(reducer(initialState, action).status, 'success')
  t.deepEqual(reducer(stateWithPosts, action).posts, [])
  t.deepEqual(reducer(stateWithPosts, action).activeDraft, defaultDraft)
  t.deepEqual(reducer(stateWithDrafts, action).activeDraft, {})
})

test('posts reducer: DELETE_POST_FAIL', t => {
  t.plan(4)

  const action = { type: DELETE_POST_FAIL, error: {} }

  t.deepEqual(reducer(initialState, action).deletingPost, false)
  t.deepEqual(reducer(initialState, action).deletedPost, false)
  t.deepEqual(reducer(initialState, action).status, 'unauthorized')
  t.deepEqual(reducer(initialState, { ...action, error: { message: 'fail' } }).status, 'fail')
})

test('posts reducer: CREATE_ACTIVE_DRAFT', t => {
  t.plan(2)

  const action = { type: CREATE_ACTIVE_DRAFT }
  const actionWithActiveDraft = { type: CREATE_ACTIVE_DRAFT, activeDraft: {} }

  t.deepEqual(reducer(initialState, action).activeDraft, defaultDraft)
  t.deepEqual(reducer(initialState, actionWithActiveDraft).activeDraft, {})
})

test('posts reducer: UPDATE_ACTIVE_DRAFT', t => {
  t.plan(1)

  const stateWithActiveDraft = {
    ...initialState,
    activeDraft: {
      _id: '123',
      meta: { title: 'title' }
    }
  }
  const action = {
    type: UPDATE_ACTIVE_DRAFT,
    activeDraft: { meta: { title: 'new title' } }
  }

  t.deepEqual(reducer(
    stateWithActiveDraft, action).activeDraft, { _id: '123', meta: { title: 'new title' } })
})

test('posts reducer: PUBLISH', t => {
  t.plan(1)

  const action = { type: PUBLISH }

  t.deepEqual(reducer(initialState, action).publishing, true)
})

test('posts reducer: PUBLISH_SUCCESS', t => {
  t.plan(6)

  const action = {
    type: PUBLISH_SUCCESS,
    result: {
      message: 'success',
      post: {}
    }
  }

  t.deepEqual(reducer(initialState, action).publishing, false)
  t.deepEqual(reducer(initialState, action).published, true)
  t.deepEqual(reducer(initialState, action).status, 'success')
  t.deepEqual(reducer(initialState, action).posts, [{ isPublished: true, isSaved: true }])
  t.deepEqual(reducer(initialState, action).drafts, [])
  t.deepEqual(reducer(initialState, action).activeDraft, defaultDraft)
})

test('posts reducer: PUBLISH_FAIL', t => {
  t.plan(4)

  const action = { type: PUBLISH_FAIL, error: {} }

  t.deepEqual(reducer(initialState, action).publishing, false)
  t.deepEqual(reducer(initialState, action).published, false)
  t.deepEqual(reducer(initialState, action).status, 'unauthorized')
  t.deepEqual(reducer(initialState, { ...action, error: { message: 'fail' } }).status, 'fail')
})

test('posts reducer: UNPUBLISH', t => {
  t.plan(1)

  const action = { type: UNPUBLISH }

  t.deepEqual(reducer(initialState, action).unpublishing, true)
})

test('posts reducer: UNPUBLISH_SUCCESS', t => {
  t.plan(6)

  const stateWithpost = { ...initialState, posts: [{ _id: '123' }] }

  const action = {
    type: UNPUBLISH_SUCCESS,
    result: {
      message: 'success',
      draft: { _id: '123' }
    }
  }

  t.deepEqual(reducer(stateWithpost, action).unpublishing, false)
  t.deepEqual(reducer(stateWithpost, action).unpublished, true)
  t.deepEqual(reducer(stateWithpost, action).status, 'success')
  t.deepEqual(reducer(stateWithpost, action).posts, [])
  t.deepEqual(reducer(
    stateWithpost, action).drafts, [{ _id: '123', isPublished: false, isSaved: true }])
  t.deepEqual(reducer(
    stateWithpost, action).activeDraft, { _id: '123', isPublished: false, isSaved: true })
})

test('posts reducer: UNPUBLISH_FAIL', t => {
  t.plan(4)

  const action = { type: UNPUBLISH_FAIL, error: {} }

  t.deepEqual(reducer(initialState, action).unpublishing, false)
  t.deepEqual(reducer(initialState, action).unpublished, false)
  t.deepEqual(reducer(initialState, action).status, 'unauthorized')
  t.deepEqual(reducer(initialState, { ...action, error: { message: 'fail' } }).status, 'fail')
})

test('posts reducer: LOAD_DRAFTS', t => {
  t.plan(1)

  const action = { type: LOAD_DRAFTS }

  t.deepEqual(reducer(initialState, action).loadingDrafts, true)
})

test('posts reducer: LOAD_DRAFTS_SUCCESS', t => {
  t.plan(6)

  const action = {
    type: LOAD_DRAFTS_SUCCESS,
    result: { drafts: [], message: 'success' }
  }

  const actionWithDraft = {
    type: LOAD_DRAFTS_SUCCESS,
    result: { drafts: [{}], message: 'success' }
  }

  t.deepEqual(reducer(initialState, action).loadingDrafts, false)
  t.deepEqual(reducer(initialState, action).loadedDrafts, true)
  t.deepEqual(reducer(initialState, action).status, 'success')
  t.deepEqual(reducer(initialState, action).drafts, [])
  t.deepEqual(reducer(initialState, action).activeDraft, defaultDraft)
  t.deepEqual(reducer(
    initialState, actionWithDraft).activeDraft, { isPublished: false, isSaved: true })
})

test('posts reducer: LOAD_DRAFTS_FAIL', t => {
  t.plan(4)

  const action = {
    type: LOAD_DRAFTS_FAIL,
    error: {}
  }

  t.deepEqual(reducer(initialState, action).loadingDrafts, false)
  t.deepEqual(reducer(initialState, action).loadedDrafts, false)
  t.deepEqual(reducer(initialState, action).status, 'unathorized')
  t.deepEqual(reducer(initialState, { ...action, error: { message: 'fail' } }).status, 'fail')
})

test('posts reducer: SAVE_DRAFT', t => {
  t.plan(1)

  const action = { type: SAVE_DRAFT }

  t.deepEqual(reducer(initialState, action).savingDraft, true)
})

test('posts reducer: SAVE_DRAFT_SUCCESS', t => {
  t.plan(5)

  const action = {
    type: SAVE_DRAFT_SUCCESS,
    result: { draft: { _id: '123' }, message: 'success' }
  }

  t.deepEqual(reducer(initialState, action).savingDraft, false)
  t.deepEqual(reducer(initialState, action).savedDraft, true)
  t.deepEqual(reducer(initialState, action).status, 'success')
  t.deepEqual(reducer(
    initialState, action).drafts, [{ _id: '123', isPublished: false, isSaved: true }])
  t.deepEqual(reducer(
    initialState, action).activeDraft, { _id: '123', isPublished: false, isSaved: true })
})

test('posts reducer: SAVE_DRAFT_FAIL', t => {
  t.plan(4)

  const action = {
    type: SAVE_DRAFT_FAIL,
    error: {}
  }

  t.deepEqual(reducer(initialState, action).savingDraft, false)
  t.deepEqual(reducer(initialState, action).savedDraft, false)
  t.deepEqual(reducer(initialState, action).status, 'unauthorized')
  t.deepEqual(reducer(initialState, { ...action, error: { message: 'fail' } }).status, 'fail')
})

test('posts reducer: UPDATE_DRAFT', t => {
  t.plan(1)

  const action = { type: UPDATE_DRAFT }

  t.deepEqual(reducer(initialState, action).updatingDraft, true)
})

test('posts reducer: UPDATE_DRAFT_SUCCESS', t => {
  t.plan(5)

  const stateWithDrafts = {
    ...initialState, drafts: [{ _id: '123', title: 'title' }]
  }

  const action = {
    type: UPDATE_DRAFT_SUCCESS,
    result: { draft: { _id: '123', title: 'new title' }, message: 'success' }
  }

  t.deepEqual(reducer(initialState, action).updatingDraft, false)
  t.deepEqual(reducer(initialState, action).updatedDraft, true)
  t.deepEqual(reducer(initialState, action).status, 'success')
  t.deepEqual(reducer(stateWithDrafts, action).drafts,
    [{ _id: '123', isPublished: false, isSaved: true, title: 'new title' }])
  t.deepEqual(reducer(stateWithDrafts, action).activeDraft,
    { _id: '123', isPublished: false, isSaved: true, title: 'new title' })
})

test('posts reducer: UPDATE_DRAFT_FAIL', t => {
  t.plan(4)

  const action = {
    type: UPDATE_DRAFT_FAIL,
    error: {}
  }

  t.deepEqual(reducer(initialState, action).updatingDraft, false)
  t.deepEqual(reducer(initialState, action).updatedDraft, false)
  t.deepEqual(reducer(initialState, action).status, 'unauthorized')
  t.deepEqual(reducer(initialState, { ...action, error: { message: 'fail' } }).status, 'fail')
})

test('posts reducer: DELETE_DRAFT', t => {
  t.plan(1)

  const action = { type: DELETE_DRAFT }

  t.deepEqual(reducer(initialState, action).deletingDraft, true)
})

test('posts reducer: DELETE_DRAFT_SUCCESS', t => {
  t.plan(5)

  const stateWithDrafts = { ...initialState, drafts: [{ _id: '123' }] }

  const action = {
    type: DELETE_DRAFT_SUCCESS,
    result: { draft: { _id: '123' }, message: 'success' }
  }

  t.deepEqual(reducer(initialState, action).deletingDraft, false)
  t.deepEqual(reducer(initialState, action).deletedDraft, true)
  t.deepEqual(reducer(initialState, action).status, 'success')
  t.deepEqual(reducer(stateWithDrafts, action).drafts, [])
  t.deepEqual(reducer(stateWithDrafts, action).activeDraft, defaultDraft)
})

test('posts reducer: DELETE_DRAFT_FAIL', t => {
  t.plan(4)

  const action = { type: DELETE_DRAFT_FAIL, error: {} }

  t.deepEqual(reducer(initialState, action).deletingDraft, false)
  t.deepEqual(reducer(initialState, action).deletedDraft, false)
  t.deepEqual(reducer(initialState, action).status, 'unauthorized')
  t.deepEqual(reducer(initialState, { ...action, error: { message: 'fail' } }).status, 'fail')
})
