import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import memoize from 'lru-memoize'

import createForm from '../../helpers/formFactory'
import { createValidator, required, email } from '../../helpers/validation'
import { auth as authActions } from '../../actions'

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

const SignInForm = ({ auth, signIn, logout, loadAuth, }) => {
  function handleSubmit(data) {
    if (!auth.user) {
      return signIn(data)
        .catch(err => console.log(err))
        .then(browserHistory.push('/admin'))
        .then(loadAuth)
    }

    return logout()
      .then(() => signIn(data))
      .catch(err => console.log(err))
      .then(browserHistory.push('/admin'))
      .then(loadAuth)
  }

  return <Form onSubmit={handleSubmit} />
}

SignInForm.propTypes = {
  auth: PropTypes.object,
  signIn: PropTypes.func,
  logout: PropTypes.func,
  loadAuth: PropTypes.func
}

export default connect(state => ({
  ...state
}), dispatch => bindActionCreators({
  ...authActions
}, dispatch))(SignInForm)
