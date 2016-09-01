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

export const isLoaded = (state) => state.auth && state.auth.loaded

export const loadAuth = () => ({
  types: [LOAD_AUTH, LOAD_AUTH_SUCCESS, LOAD_AUTH_FAIL],
  promise: client => client.get('/user/loadauth')
})

export const signIn = ({ email, password }) => ({
  types: [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAIL],
  promise: client => client.post('/user/authenticate', {
    data: { email, password }
  })
})

export const logout = () => ({
  types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
  promise: client => client.get('/user/logout')
})
