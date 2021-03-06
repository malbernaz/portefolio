import {
  SWITCH_EDITOR_FOCUS,
  SWITCH_VIEW,
  TOGGLE_EDITOR_DROPDOWN,
  TOGGLE_EDITOR_NAV,
  TOGGLE_EDITOR_SETTINGS
} from '../../constants'

export const initialState = {
  editorBottomBarIsVisible: true,
  editorDropdownIsVisible: false,
  editorNavIsVisible: false,
  editorSettingsIsVisible: false,
  editorFocused: false,
  view: 'code'
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SWITCH_EDITOR_FOCUS:
      return {
        ...initialState,
        view: state.view,
        editorBottomBarIsVisible: !action.editorFocused,
        editorFocused: action.editorFocused
      }
    case SWITCH_VIEW:
      return {
        ...initialState,
        view: action.view
      }
    case TOGGLE_EDITOR_DROPDOWN:
      return {
        ...initialState,
        view: state.view,
        editorDropdownIsVisible: !state.editorDropdownIsVisible
      }
    case TOGGLE_EDITOR_NAV:
      return {
        ...initialState,
        view: state.view,
        editorNavIsVisible: !state.editorNavIsVisible
      }
    case TOGGLE_EDITOR_SETTINGS:
      return {
        ...initialState,
        view: state.view,
        editorSettingsIsVisible: !state.editorSettingsIsVisible
      }
    default:
      return state
  }
}
