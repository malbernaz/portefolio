import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from '../constants'

const reducer = (state = { loaded: false }, action = {}) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        status: action.result.status,
        user: action.result.user
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        status:
          Object.keys(action.error) !== 0 ?
            action.error :
            'unathorized'
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

    case SIGNUP:
      return {
        ...state,
        signingUp: true
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signingUp: false,
        status: action.result.status,
        user: action.result.user
      }
    case SIGNUP_FAIL:
      return {
        ...state,
        signingUp: false,
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
