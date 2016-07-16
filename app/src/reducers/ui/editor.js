export default (
  state = {
    editorNavIsVisible: false,
    editorDropdownIsVisible: false,
    view: 'code'
  },
  action = {}
) => {
  switch (action.type) {
    case 'TOGGLE_EDITOR_NAV':
      return {
        ...state,
        editorNavIsVisible: !state.editorNavIsVisible
      }
    case 'TOGGLE_EDITOR_DROPDOWN':
      return {
        ...state,
        editorDropdownIsVisible: !state.editorDropdownIsVisible
      }
    case 'SWITCH_VIEW':
      return {
        ...state,
        view: action.view
      }
    default:
      return state
  }
}
