import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import SignInForm from '../containers/SignInForm'

const SignIn = () => (
  <section className="signin">
    <Helmet title="sign in" />
    <SignInForm />
  </section>
)

SignIn.propTypes = {
  auth: PropTypes.object
}

export default SignIn
