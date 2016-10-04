import test from 'tape'

import { TOGGLE_NAV } from '../../constants'

import reducer from './nav'

const initialState = {
  navIsVisible: false
}

test('ui/editor reducer: returns state by default', t => {
  t.plan(1)

  t.deepEqual(reducer(), initialState)
})

test('ui/editor reducer: TOGGLE_NAV', t => {
  t.plan(2)

  const action = { type: TOGGLE_NAV }

  t.deepEqual(reducer(initialState, action).navIsVisible, true)
  t.deepEqual(reducer({ ...initialState, navIsVisible: true }, action).navIsVisible, false)
})
