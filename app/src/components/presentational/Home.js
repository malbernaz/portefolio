import React from 'react'
import Helmet from 'react-helmet'

import { Posts } from '../'

const Home = () => (
  <section className="home">
    <Helmet title="home" />
    <Posts />
  </section>
)

export default Home
