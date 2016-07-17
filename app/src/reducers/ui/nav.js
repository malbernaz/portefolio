const initialState = {
  navIsVisible: false
}

export default (state = initialState, action = {}) => {
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
