import React from 'react'
import Helmet from 'react-helmet'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { Posts } from '../../containers'
import s from './Home.scss'

const Home = () => (
  <section className={ s.home }>
    <Helmet title="home" />
    <Posts />
  </section>
)

export default withStyles(s)(Home)
