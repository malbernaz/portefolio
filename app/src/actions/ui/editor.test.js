import test from 'tape'

import {
  SWITCH_VIEW,
  TOGGLE_EDITOR_DROPDOWN,
  TOGGLE_EDITOR_NAV,
  TOGGLE_EDITOR_SETTINGS
} from '../../constants'

import {
  switchView,
  toggleEditorDropdown,
  toggleEditorNav,
  toggleEditorSettings
} from './editor'

test('ui/editor action: switchView', t => {
  const view = 'a view'

  t.plan(1)
  t.deepEqual(switchView(view), { type: SWITCH_VIEW, view })
})

test('ui/editor action: toggleEditorDropdown', t => {
  t.plan(1)
  t.deepEqual(toggleEditorDropdown(), { type: TOGGLE_EDITOR_DROPDOWN })
})

test('ui/editor action: toggleEditorNav', t => {
  t.plan(1)
  t.deepEqual(toggleEditorNav(), { type: TOGGLE_EDITOR_NAV })
})

test('ui/editor action: toggleEditorSettings', t => {
  t.plan(1)
  t.deepEqual(toggleEditorSettings(), { type: TOGGLE_EDITOR_SETTINGS })
})
