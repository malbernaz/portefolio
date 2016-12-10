import React, { cloneElement, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import TransitionGroup from 'react-addons-css-transition-group'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Nav from './Nav'
import MobileNav from './MobileNav/MobileNav'
import MessageNotifier from './MessageNotifier/MessageNotifier'

import config from '../config'
import s from '../theme/main.scss'

const mapStateToProps = (state, { location, children }) => ({
  path: location.pathname,
  children
})

const AppView = ({ children, path }) =>
  <div className={ s.appView }>
    <Helmet key="helmet" { ...config.head } />
    <Nav />
    <div className={ s.container }>
      <MobileNav />
      <TransitionGroup
        component="div"
        className={ s.animationContainer }
        transitionName="page-transition"
        transitionEnterTimeout={ 600 }
        transitionLeaveTimeout={ 600 }
      >
        { cloneElement(children, { key: path }) }
      </TransitionGroup>
    </div>
    <MessageNotifier />
  </div>

AppView.propTypes = {
  children: PropTypes.element,
  path: PropTypes.string
}

export default connect(mapStateToProps)(withStyles(s)(AppView))
