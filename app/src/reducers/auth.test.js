import test from 'tape'

import {
  LOAD_AUTH,
  LOAD_AUTH_SUCCESS,
  LOAD_AUTH_FAIL,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from '../constants'

import reducer from './auth'

const initialState = { loaded: false }

test('auth reducer: returns state by default', t => {
  t.plan(1)

  t.deepEqual(reducer(), initialState)
})

test('auth reducer: LOAD_AUTH', t => {
  t.plan(1)

  const action = { type: LOAD_AUTH }

  t.deepEqual(reducer(initialState, action).loading, true)
})

test('auth reducer: LOAD_AUTH_SUCCESS', t => {
  t.plan(4)

  const action = {
    type: LOAD_AUTH_SUCCESS,
    result: {
      message: 'success',
      user: {}
    }
  }

  t.deepEqual(reducer(initialState, action).loading, false)
  t.deepEqual(reducer(initialState, action).loaded, true)
  t.deepEqual(reducer(initialState, action).status, 'success')
  t.deepEqual(reducer(initialState, action).user, {})
})

test('auth reducer: LOAD_AUTH_FAIL', t => {
  t.plan(4)

  const action = { type: LOAD_AUTH_FAIL }

  t.deepEqual(reducer(initialState, action).loading, false)
  t.deepEqual(reducer(initialState, action).loaded, false)
  t.deepEqual(reducer(initialState, action).status, 'unauthorized')
  t.deepEqual(reducer(initialState, action).user, null)
})

test('auth reducer: SIGNIN', t => {
  t.plan(1)

  const action = { type: SIGNIN }

  t.deepEqual(reducer(initialState, action).signingIn, true)
})

test('auth reducer: SIGNIN_SUCCESS', t => {
  t.plan(4)

  const action = {
    type: SIGNIN_SUCCESS,
    result: {
      message: 'success',
      user: {}
    }
  }

  t.deepEqual(reducer(initialState, action).signingIn, false)
  t.deepEqual(reducer(initialState, action).signedIn, true)
  t.deepEqual(reducer(initialState, action).status, 'success')
  t.deepEqual(reducer(initialState, action).user, {})
})

test('auth reducer: SIGNIN_FAIL', t => {
  t.plan(4)

  const action = {
    type: SIGNIN_FAIL,
    error: { message: 'fail' }
  }

  t.deepEqual(reducer(initialState, action).signingIn, false)
  t.deepEqual(reducer(initialState, action).signedIn, false)
  t.deepEqual(reducer(initialState, action).status, 'fail')
  t.deepEqual(reducer(initialState, action).user, null)
})

test('auth reducer: LOGOUT', t => {
  t.plan(1)

  const action = { type: LOGOUT }

  t.deepEqual(reducer(initialState, action).loggingOut, true)
})

test('auth reducer: LOGOUT_SUCCESS', t => {
  t.plan(4)

  const action = {
    type: LOGOUT_SUCCESS,
    result: {
      message: 'success'
    }
  }

  t.deepEqual(reducer(initialState, action).loggingOut, false)
  t.deepEqual(reducer(initialState, action).loggedOut, true)
  t.deepEqual(reducer(initialState, action).status, 'success')
  t.deepEqual(reducer(initialState, action).user, null)
})

test('auth reducer: LOGOUT_FAIL', t => {
  t.plan(3)

  const action = {
    type: LOGOUT_FAIL,
    error: { message: 'fail' }
  }

  t.deepEqual(reducer(initialState, action).loggingOut, false)
  t.deepEqual(reducer(initialState, action).loggedOut, false)
  t.deepEqual(reducer(initialState, action).status, 'fail')
})
