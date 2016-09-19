import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { SignInForm } from './'
import * as authActions from '../actions/auth'
import * as messageActions from '../actions/message'

const SignIn = ({ auth, signIn, logout, loadAuth, showMessage, redirect }) => {
  function handleSubmit (data) {
    const submitPromise = () => signIn(data)
      .then(({ message }) => {
        showMessage(message)
        redirect('/admin/editor')
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
  redirect: PropTypes.func,
  showMessage: PropTypes.func,
  signIn: PropTypes.func
}

export default connect(
  state => ({
    ...state
  }),
  dispatch => bindActionCreators({
    ...authActions,
    ...messageActions,
    redirect: push
  }, dispatch)
)(SignIn)
