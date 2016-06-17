import React from 'react'
import Helmet from 'react-helmet'

import { SignInForm } from '../'

const SignIn = () => (
  <section className="signin">
    <Helmet title="sign in" />
    <SignInForm />
  </section>
)

export default SignIn
