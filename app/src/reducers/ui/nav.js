export default (state = { navIsVisible: false }, action = {}) => {
  switch (action.type) {
    case 'TOGGLE_NAV':
      return {
        ...state,
        navIsVisible: !state.navIsVisible
      }
    default:
      return state
  }
}
