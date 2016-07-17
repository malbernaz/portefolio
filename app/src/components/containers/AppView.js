import React, { cloneElement, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Helmet from 'react-helmet'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'

import config from '../../config'

import { ui as uiActions } from '../../actions'

import { Nav, Icon, MessageNotifier } from '../'


const AppView = ({ children, location, toggleNav }) => {
  const toggle = e => {
    e.preventDefault()
    toggleNav()
  }

  return (
    <div className="app-view">
      <Helmet { ...config.head } />
      <Nav />
      <a href="#" onClick={ e => toggle(e) } className="nav-toggle">
        <Icon name="menu" />
      </a>
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
}

AppView.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  toggleNav: PropTypes.func,
}

export default connect(
  state => ({ ...state }),
  dispatch => bindActionCreators({
    ...uiActions.nav
  }, dispatch)
)(AppView)
