import React, { cloneElement, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'

import config from '../../config'

import { auth } from '../../actions'

import { Nav, MessageNotifier } from '../'


const AppView = ({ children, location }) => (
  <div id="app-view" className="app-view">
    <Helmet { ...config.head } />
    <Nav />
    <div className="container">
      <ReactCSSTransitionGroup
        component="div"
        transitionName="page-transition"
        transitionEnterTimeout={ 500 }
        transitionLeaveTimeout={ 500 }
      >
        { cloneElement(children, { key: location.pathname }) }
      </ReactCSSTransitionGroup>
    </div>
    <MessageNotifier />
  </div>
)

AppView.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object
}

export default connect(state => ({
  ...state
}), dispatch => bindActionCreators({
  ...auth
}, dispatch))(AppView)
