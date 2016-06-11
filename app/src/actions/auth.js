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

export const isLoaded = (state) =>
  state.auth && state.auth.loaded

export const load = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: client => client.get('/user/loadauth')
})

export const signin = ({ email, password }) => ({
  types: [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAIL],
  promise: client => client.post('/user/authenticate', {
    data: { email, password }
  })
})

export const signup = ({
  completeName,
  email,
  password,
  passwordConfirmation
}) => ({
  types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
  promise: client => client.post('/user/register', {
    data: { completeName, email, password, passwordConfirmation }
  })
})

export const logout = () => ({
  types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
  promise: client => client.get('/user/logout')
})
