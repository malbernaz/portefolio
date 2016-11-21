import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import config from '../config'
import NavView from '../components/NavView/NavView'

import { logout } from '../actions/auth'
import { toggleNav } from '../actions/ui/nav'

const mapStateToProps = ({ auth, ui: { nav: { navIsVisible } } }) => ({
  auth,
  navIsVisible
})

const mapDispatchToProps = dispatch => bindActionCreators({
  logoutAction: logout,
  toggleNavAction: toggleNav
}, dispatch)

const Nav = ({ auth, navIsVisible, logoutAction, toggleNavAction }) => {
  const toggle = e => {
    e.preventDefault()

    toggleNavAction()
  }

  const toggleOnLinkClick = () => {
    if (matchMedia('(max-width: 48rem)').matches) toggleNavAction()
  }

  const logoutAndToggle = () => {
    if (matchMedia('(max-width: 48rem)').matches) toggleNavAction()

    logoutAction()
  }

  return (
    <NavView
      description={ config.description }
      email={ config.email }
      github={ config.github }
      isVisible={ navIsVisible }
      logout={ logoutAndToggle }
      title={ config.title }
      toggleNav={ toggle }
      toggleOnLinkClick={ toggleOnLinkClick }
      twitter={ config.twitter }
      user={ auth.user }
    />
  )
}

const { func, shape, object, bool } = PropTypes

Nav.propTypes = {
  auth: shape({ user: object }),
  logoutAction: func,
  navIsVisible: bool,
  toggleNavAction: func,
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Nav)
