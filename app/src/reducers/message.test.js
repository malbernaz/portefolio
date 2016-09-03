import test from 'tape'

import { SHOW_MESSAGE, DISSMISS_MESSAGE } from '../constants'
import reducer from './message'

const initialState = { isShown: false, content: '' }

test('message reducer: returns state by default', t => {
  t.plan(1)

  t.deepEqual(reducer(), initialState)
})

test('message reducer: SHOW_MESSAGE', t => {
  t.plan(2)

  const action = {
    type: SHOW_MESSAGE,
    message: 'some message'
  }

  t.deepEqual(reducer(initialState, action).isShown, true)
  t.deepEqual(reducer(initialState, action).content, 'some message')
})

test('message reducer: DISSMISS_MESSAGE', t => {
  t.plan(1)

  const action = { type: DISSMISS_MESSAGE }

  t.deepEqual(reducer(initialState, action).isShown, false)
})
