import test from 'tape'

import configureStore from '../store'
import ApiClient from '../helpers/ApiClient'
import defaultDraft from '../helpers/defaultDraft'

import {
  CREATE_ACTIVE_DRAFT,
  DELETE_DRAFT_FAIL,
  DELETE_DRAFT_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
  LOAD_DRAFTS_FAIL,
  LOAD_DRAFTS_SUCCESS,
  LOAD_POSTS_AND_DRAFTS_FAIL,
  LOAD_POSTS_AND_DRAFTS_SUCCESS,
  LOAD_POSTS_FAIL,
  LOAD_POSTS_SUCCESS,
  PUBLISH_FAIL,
  PUBLISH_SUCCESS,
  SAVE_DRAFT_FAIL,
  SAVE_DRAFT_SUCCESS,
  UNPUBLISH_FAIL,
  UNPUBLISH_SUCCESS,
  UPDATE_ACTIVE_DRAFT,
  UPDATE_DRAFT_FAIL,
  UPDATE_DRAFT_SUCCESS,
  UPDATE_POST_FAIL,
  UPDATE_POST_SUCCESS
} from '../constants'

import {
  loadPostsAndDrafts,
  loadPosts,
  updatePost,
  deletePost,
  publish,
  unpublish,
  loadDrafts,
  saveDraft,
  updateDraft,
  deleteDraft,
  createActiveDraft,
  updateActiveDraft
} from './posts'

const initialState = {}
const client = new ApiClient()
const store = configureStore(client, null, initialState)

test('posts action: loadPostsAndDrafts', t => {
  t.plan(1)

  store.dispatch(loadPostsAndDrafts())
    .then(() => t.equal(store.getState().latestAction.type, LOAD_POSTS_AND_DRAFTS_SUCCESS))
    .catch(() => t.equal(store.getState().latestAction.type, LOAD_POSTS_AND_DRAFTS_FAIL))
})

test('posts action: loadPosts', t => {
  t.plan(1)

  store.dispatch(loadPosts())
    .then(() => t.equal(store.getState().latestAction.type, LOAD_POSTS_SUCCESS))
    .catch(() => t.equal(store.getState().latestAction.type, LOAD_POSTS_FAIL))
})

test('posts action: updatePost', t => {
  t.plan(1)

  store.dispatch(updatePost({}))
    .then(() => t.equal(store.getState().latestAction.type, UPDATE_POST_SUCCESS))
    .catch(() => t.equal(store.getState().latestAction.type, UPDATE_POST_FAIL))
})

test('posts action: deletePost', t => {
  t.plan(1)

  store.dispatch(deletePost('id'))
    .then(() => t.equal(store.getState().latestAction.type, DELETE_POST_SUCCESS))
    .catch(() => t.equal(store.getState().latestAction.type, DELETE_POST_FAIL))
})

test('posts action: publish', t => {
  t.plan(1)

  store.dispatch(publish({}))
    .then(() => t.equal(store.getState().latestAction.type, PUBLISH_SUCCESS))
    .catch(() => t.equal(store.getState().latestAction.type, PUBLISH_FAIL))
})

test('posts action: unpublish', t => {
  t.plan(1)

  store.dispatch(unpublish({}))
    .then(() => t.equal(store.getState().latestAction.type, UNPUBLISH_SUCCESS))
    .catch(() => t.equal(store.getState().latestAction.type, UNPUBLISH_FAIL))
})

test('posts action: loadDrafts', t => {
  t.plan(1)

  store.dispatch(loadDrafts())
    .then(() => t.equal(store.getState().latestAction.type, LOAD_DRAFTS_SUCCESS))
    .catch(() => t.equal(store.getState().latestAction.type, LOAD_DRAFTS_FAIL))
})

test('posts action: saveDraft', t => {
  t.plan(1)

  store.dispatch(saveDraft())
    .then(() => t.equal(store.getState().latestAction.type, SAVE_DRAFT_SUCCESS))
    .catch(() => t.equal(store.getState().latestAction.type, SAVE_DRAFT_FAIL))
})

test('posts action: updateDraft', t => {
  t.plan(1)

  store.dispatch(updateDraft({}))
    .then(() => t.equal(store.getState().latestAction.type, UPDATE_DRAFT_SUCCESS))
    .catch(() => t.equal(store.getState().latestAction.type, UPDATE_DRAFT_FAIL))
})

test('posts action: deleteDraft', t => {
  t.plan(1)

  store.dispatch(deleteDraft('id'))
    .then(() => t.equal(store.getState().latestAction.type, DELETE_DRAFT_SUCCESS))
    .catch(() => t.equal(store.getState().latestAction.type, DELETE_DRAFT_FAIL))
})

test('posts action: createActiveDraft', t => {
  t.plan(2)

  t.equal(createActiveDraft(defaultDraft).type, CREATE_ACTIVE_DRAFT)
  t.deepLooseEqual(createActiveDraft(defaultDraft).activeDraft, defaultDraft)
})

test('posts action: updateActiveDraft', t => {
  t.plan(2)

  t.equal(updateActiveDraft(defaultDraft).type, UPDATE_ACTIVE_DRAFT)
  t.deepLooseEqual(updateActiveDraft(defaultDraft).activeDraft, defaultDraft)
})
