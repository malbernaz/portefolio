import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import { SignInForm } from '../'

const SignIn = ({ auth }) => (
  <section className="signin">
    <Helmet title="sign in" />
    <SignInForm />
    <span
      className={ typeof auth.signedIn !== 'undefined' && !auth.signedIn ?
        'signin__error-message--shown' :
        'signin__error-message' }
    >
      { typeof auth.signedIn !== 'undefined' && !auth.signedIn ? auth.status : '' }
    </span>
  </section>
)

SignIn.propTypes = {
  auth: PropTypes.object
}

export default connect(({ auth }) => ({ auth }))(SignIn)
