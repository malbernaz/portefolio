import { combineReducers } from 'redux'
import editor from './editor'
import nav from './nav'

export default combineReducers({
  editor,
  nav
})
