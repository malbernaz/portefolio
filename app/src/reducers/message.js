import { SHOW_MESSAGE, DISSMISS_MESSAGE } from '../constants'

const reducer = (state = { isShown: false, content: '' }, action = {}) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        ...state,
        isShown: true,
        content: action.message
      }
    case DISSMISS_MESSAGE:
      return {
        ...state,
        isShown: false
      }
    default:
      return state
  }
}

export default reducer
