import {
  LOAD_AUTH,
  LOAD_AUTH_SUCCESS,
  LOAD_AUTH_FAIL,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from '../constants'

const reducer = (state = { loaded: false }, action = {}) => {
  switch (action.type) {
    case LOAD_AUTH:
      return {
        ...state,
        loading: true
      }
    case LOAD_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        status: action.result.status,
        user: action.result.user
      }
    case LOAD_AUTH_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        status: 'unathorized'
      }

    case SIGNIN:
      return {
        ...state,
        signingIn: true
      }
    case SIGNIN_SUCCESS:
      return {
        ...state,
        signingIn: false,
        status: action.result.status,
        user: action.result.user
      }
    case SIGNIN_FAIL:
      return {
        ...state,
        signingIn: false,
        user: null,
        status: action.error.status
      }

    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null,
        status: action.result.status
      }
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        status: action.error.status
      }

    default:
      return state
  }
}

export default reducer
