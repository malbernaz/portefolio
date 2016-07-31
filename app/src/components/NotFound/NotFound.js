import React from 'react'
import Helmet from 'react-helmet'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './NotFound.scss'

const NotFound = () => (
  <div className={ s.wrapper }>
    <section className={ s.root }>
      <Helmet title="NOT FOUND" />
      <h2 className={ s.header }>
        404 Page Not Found
      </h2>
      <h3 className={ s.blurb }>
        you are in unexplored waters
      </h3>
    </section>
  </div>
)

export default withStyles(s)(NotFound)
