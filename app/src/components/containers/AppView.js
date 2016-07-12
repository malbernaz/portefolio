import React, { cloneElement, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'

import config from '../../config'

import { Nav, MessageNotifier } from '../'


const AppView = ({ children, location }) => (
  <div id="app-view" className="app-view">
    <Helmet { ...config.head } />
    <Nav />
    <div className="container">
      <ReactCSSTransitionGroup
        component="div"
        transitionName="page-transition"
        transitionEnterTimeout={ 300 }
        transitionLeaveTimeout={ 300 }
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

export default connect(
  state => ({ ...state })
)(AppView)
