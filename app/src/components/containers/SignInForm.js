import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import memoize from 'lru-memoize'

import createForm from '../../helpers/formFactory'
import { createValidator, required, email } from '../../helpers/validation'
import { auth as authActions, message as messageActions } from '../../actions'

const validation = createValidator({
  email: [required, email],
  password: required
})

const Form = createForm({
  validate: memoize(10)(validation),
  styleClass: 'signin-form',
  formName: 'signin',
  inputFields: [{
    name: 'email',
    type: 'email',
    label: 'email'
  }, {
    name: 'password',
    type: 'password',
    label: 'password'
  }],
  submitText: 'Sign In'
})

const SignInForm = ({ auth, signIn, logout, loadAuth, showMessage }) => {
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

  return <Form onSubmit={ handleSubmit } />
}

SignInForm.propTypes = {
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
)(SignInForm)
