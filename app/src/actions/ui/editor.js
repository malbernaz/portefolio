import {
  SWITCH_EDITOR_FOCUS,
  SWITCH_VIEW,
  TOGGLE_EDITOR_DROPDOWN,
  TOGGLE_EDITOR_NAV,
  TOGGLE_EDITOR_SETTINGS
} from '../../constants'

export const switchEditorFocus = editorFocused => ({ type: SWITCH_EDITOR_FOCUS, editorFocused })

export const switchView = view => ({ type: SWITCH_VIEW, view })

export const toggleEditorDropdown = () => ({ type: TOGGLE_EDITOR_DROPDOWN })

export const toggleEditorNav = () => ({ type: TOGGLE_EDITOR_NAV })

export const toggleEditorSettings = () => ({ type: TOGGLE_EDITOR_SETTINGS })
