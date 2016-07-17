const initialState = {
  editorNavIsVisible: false,
  editorDropdownIsVisible: false,
  view: 'code'
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'TOGGLE_EDITOR_NAV':
      return {
        ...state,
        editorDropdownIsVisible: false,
        editorNavIsVisible: !state.editorNavIsVisible
      }
    case 'TOGGLE_EDITOR_DROPDOWN':
      return {
        ...state,
        editorNavIsVisible: false,
        editorDropdownIsVisible: !state.editorDropdownIsVisible
      }
    case 'SWITCH_VIEW':
      return {
        ...state,
        editorNavIsVisible: false,
        editorDropdownIsVisible: false,
        view: action.view
      }
    default:
      return state
  }
}
