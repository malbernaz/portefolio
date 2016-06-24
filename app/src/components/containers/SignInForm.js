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
    const submitChain = () => signIn(data)
      .then(result => {
        browserHistory.push('/admin')
        return result
      })
      .catch(err => {
        browserHistory.push('/admin')
        return err
      })
      .then(loadAuth)

    return auth.user ?
      logout().then(() => submitChain()) :
      submitChain()
  }

  return (
    <div className="signin-wrapper">
      <Form onSubmit={handleSubmit} />
      {
        !auth.status.success ?
          <span className="error-message">{auth.status.message}</span> : ''
      }
    </div>
  )
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
