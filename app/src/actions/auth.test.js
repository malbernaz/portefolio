import test from 'tape'

import {
  LOAD_AUTH_SUCCESS,
  LOAD_AUTH_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from '../constants'

import configureStore from '../store'
import ApiClient from '../helpers/ApiClient'

import {
  loadAuth,
  signIn,
  logout
} from './auth'

const initialState = {}
const client = new ApiClient()
const store = configureStore(client, null, initialState)

test('auth action: loadAuth', t => {
  t.plan(1)

  store.dispatch(loadAuth())
    .then(() => t.equal(store.getState().latestAction.type, LOAD_AUTH_SUCCESS))
    .catch(() => t.equal(store.getState().latestAction.type, LOAD_AUTH_FAIL))
})

test('auth action: signIn', t => {
  t.plan(1)

  store.dispatch(signIn({ email: 's@s.com', password: '123' }))
    .then(() => t.equal(store.getState().latestAction.type, SIGNIN_SUCCESS))
    .catch(() => t.equal(store.getState().latestAction.type, SIGNIN_FAIL))
})

test('auth action: logout', t => {
  t.plan(1)

  store.dispatch(logout())
    .then(() => t.equal(store.getState().latestAction.type, LOGOUT_SUCCESS))
    .catch(() => t.equal(store.getState().latestAction.type, LOGOUT_FAIL))
})
