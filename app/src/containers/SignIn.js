import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import SignInForm from './SignInForm/SignInForm'

import {
  signIn as signInAction,
  logout as logoutAction,
  loadAuth as loadAuthAction
} from '../actions/auth'
import { showMessage as showMessageAction } from '../actions/message'

const SignIn = ({ user, signIn, logout, loadAuth, showMessage, redirect }) => {
  function handleSubmit (data) {
    const submitPromise = () => signIn(data)
      .then(({ message }) => {
        showMessage(message)
        redirect('/admin/editor')
      })
      .then(loadAuth)
      .catch(({ message }) => showMessage(message))

    return user ?
      logout().then(() => submitPromise()) :
      submitPromise()
  }

  return <SignInForm onSubmit={ handleSubmit } />
}

const { object, func } = PropTypes

SignIn.propTypes = {
  user: object, // eslint-disable-line react/forbid-prop-types
  loadAuth: func,
  logout: func,
  redirect: func,
  showMessage: func,
  signIn: func
}

export default connect(
  ({ auth: { user } }) => ({ user }),
  dispatch => bindActionCreators({
    signIn: signInAction,
    logout: logoutAction,
    loadAuth: loadAuthAction,
    showMessage: showMessageAction,
    redirect: push
  }, dispatch)
)(SignIn)
