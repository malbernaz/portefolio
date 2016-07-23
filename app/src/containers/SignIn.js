import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { SignInForm } from './'
import * as authActions from '../actions/auth'
import * as messageActions from '../actions/message'

const SignIn = ({ auth, signIn, logout, loadAuth, showMessage }) => {
  function handleSubmit(data) {
    const submitPromise = () => signIn(data)
      .then(({ message }) => {
        showMessage(message)
        browserHistory.push('/admin/editor')
      })
      .then(loadAuth)
      .catch(({ message }) => showMessage(message))

    return auth.user ?
      logout().then(() => submitPromise()) :
      submitPromise()
  }

  return <SignInForm onSubmit={ handleSubmit } />
}

SignIn.propTypes = {
  auth: PropTypes.object,
  loadAuth: PropTypes.func,
  logout: PropTypes.func,
  showMessage: PropTypes.func,
  signIn: PropTypes.func
}

export default connect(
  state => ({
    ...state
  }),
  dispatch => bindActionCreators({
    ...authActions,
    ...messageActions
  }, dispatch)
)(SignIn)
