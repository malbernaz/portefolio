import React from 'react'
import Helmet from 'react-helmet'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './NotFound.scss'
import { Wrapper } from '../'

const NotFound = () => (
  <Wrapper>
    <div className={ s.root }>
      <Helmet title="NOT FOUND" />
      <h2 className={ s.header }>
        404 Page Not Found
      </h2>
      <h3 className={ s.blurb }>
        you are in unexplored waters
      </h3>
    </div>
  </Wrapper>
)

export default withStyles(s)(NotFound)
