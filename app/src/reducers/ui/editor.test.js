import test from 'tape'

import {
  SWITCH_VIEW,
  TOGGLE_EDITOR_DROPDOWN,
  TOGGLE_EDITOR_NAV,
  TOGGLE_EDITOR_SETTINGS
} from '../../constants'

import reducer, { initialState } from './editor'

test('ui/editor reducer: returns state by default', t => {
  t.plan(1)

  t.deepEqual(reducer(), initialState)
})

test('ui/editor reducer: SWITCH_VIEW', t => {
  t.plan(1)

  const action = { type: SWITCH_VIEW, view: 'preview' }

  t.deepEqual(reducer(initialState, action), { ...initialState, view: 'preview' })
})

test('ui/editor reducer: TOGGLE_EDITOR_DROPDOWN', t => {
  t.plan(1)

  const action = { type: TOGGLE_EDITOR_DROPDOWN }

  t.deepEqual(reducer(initialState, action), { ...initialState, editorDropdownIsVisible: true })
})

test('ui/editor reducer: TOGGLE_EDITOR_NAV', t => {
  t.plan(1)

  const action = { type: TOGGLE_EDITOR_NAV }

  t.deepEqual(reducer(initialState, action), { ...initialState, editorNavIsVisible: true })
})

test('ui/editor reducer: TOGGLE_EDITOR_SETTINGS', t => {
  t.plan(1)

  const action = { type: TOGGLE_EDITOR_SETTINGS }

  t.deepEqual(reducer(initialState, action), { ...initialState, editorSettingsIsVisible: true })
})
