import React, { cloneElement, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import config from '../config'
import { Nav, MobileNav } from './'
import MessageNotifier from './MessageNotifier/MessageNotifier'
import s from '../theme/main.scss'

const AppView = ({ path, children }) =>
  <div className={ s.appView }>
    <Helmet { ...config.head } />
    <Nav />
    <div className={ s.container }>
      <MobileNav />
      <ReactCSSTransitionGroup
        component="div"
        className={ s.animationContainer }
        transitionName="page-transition"
        transitionEnterTimeout={ 300 }
        transitionLeaveTimeout={ 300 }
      >
        { cloneElement(children, { key: path }) }
      </ReactCSSTransitionGroup>
    </div>
    <MessageNotifier />
  </div>

AppView.propTypes = {
  children: PropTypes.element,
  path: PropTypes.string
}

export default connect(
  (state, { location, children }) => ({
    path: location.pathname,
    children
  })
)(withStyles(s)(AppView))
