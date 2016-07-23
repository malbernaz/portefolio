import {
  TOGGLE_EDITOR_NAV,
  TOGGLE_EDITOR_DROPDOWN,
  SWITCH_VIEW
} from '../../constants'

export const toggleEditorNav = () => ({ type: TOGGLE_EDITOR_NAV })

export const toggleEditorDropdown = () => ({ type: TOGGLE_EDITOR_DROPDOWN })

export const switchView = view => ({ type: SWITCH_VIEW, view })
