import React from 'react'
import Helmet from 'react-helmet'

import Posts from '../../containers/Posts/Posts'
import Wrapper from '../Wrapper/Wrapper'

const Home = () =>
  <Wrapper>
    <Helmet title="HOME" />
    <Posts />
  </Wrapper>

export default Home
