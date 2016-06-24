import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import auth from './auth'
import posts from './posts'
import message from './message'

const rootReducer = combineReducers({
  auth,
  posts,
  message,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer
