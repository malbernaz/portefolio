import React, { cloneElement, PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Helmet from 'react-helmet'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Nav from './Nav'
import MobileNav from './MobileNav/MobileNav'
import MessageNotifier from './MessageNotifier/MessageNotifier'

import { loadAuth } from '../actions/auth'

import config from '../config'
import s from '../theme/main.scss'

const mapStateToProps = (state, { location, children }) => ({
  path: location.pathname,
  children
})

const mapDispatchToProps = dispatch => bindActionCreators({
  checkAuthentication: loadAuth
}, dispatch)

@withStyles(s)
@connect(mapStateToProps, mapDispatchToProps)
export default class AppView extends Component {
  static propTypes = {
    children: PropTypes.element,
    path: PropTypes.string,
    checkAuthentication: PropTypes.func
  }

  componentWillMount () {
    this.props.checkAuthentication()
  }

  render () {
    const { path, children } = this.props
    return (
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
    )
  }
}
