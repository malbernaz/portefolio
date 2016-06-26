import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import config from '../../config'

import { auth } from '../../actions'

import { Nav } from '../'

const AppView = ({ children }) => (
  <div id="app-view" className="app-view">
    <Helmet { ...config.head } />
    <Nav />
    <div className="container">
      { children }
    </div>
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
