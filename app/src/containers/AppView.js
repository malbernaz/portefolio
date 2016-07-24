import React, { cloneElement, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import config from '../config'
import { Nav } from './'
import MessageNotifier from './MessageNotifier/MessageNotifier'
import s from '../theme/main.scss'

const AppView = ({ children, location }) => (
  <div className="app-view">
    <Helmet { ...config.head } />
    <Nav />
    <div className="container">
      <ReactCSSTransitionGroup
        component="div"
        className="animationContainer"
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
  children: PropTypes.element,
  location: PropTypes.object
}

export default connect(
  state => ({
    ...state
  })
)(withStyles(s)(AppView))
