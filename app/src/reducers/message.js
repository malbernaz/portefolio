import { SHOW_MESSAGE, DISSMISS_MESSAGE } from '../constants'

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        ...state,
        messageIsShown: true,
        message: action.message
      }
    case DISSMISS_MESSAGE:
      return {
        ...state,
        messageIsShown: false,
        message: action.message
      }
    default:
      return state
  }
}

export default reducer
