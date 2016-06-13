import React from 'react'
import Helmet from 'react-helmet'

import { SignInForm } from '../'

const SignIn = () => (
  <div>
    <Helmet title="sign in" />
    <SignInForm />
  </div>
)

export default SignIn
