import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import config from '../config'
import { NavView } from '../components'
import * as authActions from '../actions/auth'
import * as navActions from '../actions/ui/nav'

const Nav = ({ auth, ui: { nav }, logout, toggleNav }) => {
  const toggle = e => {
    e.preventDefault()
    toggleNav()
  }

  const toggleOnLinkClick = () => {
    if (matchMedia('(max-width: 48rem)').matches) toggleNav()
  }

  return (
    <NavView
      description={ config.description }
      email={ config.email }
      github={ config.github }
      isVisible={ nav.navIsVisible }
      logout={ logout }
      title={ config.title }
      toggleNav={ toggle }
      toggleOnLinkClick={ toggleOnLinkClick }
      twitter={ config.twitter }
      user={ auth.user }
    />
  )
}

Nav.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func,
  ui: PropTypes.object,
  toggleNav: PropTypes.func
}

export default connect(
  state => ({
    ...state
  }),
  dispatch => bindActionCreators({
    ...authActions,
    ...navActions
  }, dispatch)
)(Nav)
