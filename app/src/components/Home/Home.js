import React from 'react'
import Helmet from 'react-helmet'

import { Posts } from '../../containers'
import { Wrapper } from '../'

const Home = () =>
  <Wrapper>
    <Helmet title="HOME" />
    <Posts />
  </Wrapper>

export default Home
