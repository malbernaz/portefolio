export default (state = { editorNavIsVisible: false }, action = {}) => {
  switch (action.type) {
    case 'TOGGLE_EDITOR_NAV':
      return {
        ...state,
        editorNavIsVisible: !state.editorNavIsVisible
      }
    default:
      return state
  }
}
