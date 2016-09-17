import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Wrapper.scss'

const Wrapper = ({ children }) =>
  <section className={ s.root }>
    <div className={ s.content }>{ children }</div>
  </section>

Wrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default withStyles(s)(Wrapper)
