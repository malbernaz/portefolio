import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import config from '../../config'

import { auth } from '../../actions'

import { Nav, Footer } from '../'

const AppView = ({ children }) => (
  <div id="app-view">
    <Helmet { ...config.head } />
    <Nav />
    {children}
    <Footer />
  </div>
)

AppView.propTypes = {
  children: PropTypes.node
}

export default connect(state => ({
  ...state
}), dispatch => bindActionCreators({
  ...auth
}, dispatch))(AppView)
