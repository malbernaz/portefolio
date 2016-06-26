import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IndexLink, Link } from 'react-router'

import { Icon } from '../'

import { auth as authActions } from '../../actions'

const Nav = ({ auth, logout }) => (
  <div className={ auth.user ? 'nav-wrapper logged-in' : 'nav-wrapper' }>
    <a herf="#" className="toggle-menu">
      <Icon name="menu" />
      <span>menu</span>
    </a>
    <nav>
      <div className="logo">
        <Icon name="logo" />
      </div>
      <div className="main-nav">
        <ul>
          <li><IndexLink to="/">home</IndexLink></li>
          <li><IndexLink to="/about">about</IndexLink></li>
          <li><IndexLink to="/contact">contact</IndexLink></li>
          { auth.user ?
            <li><Link to="/admin">editor</Link></li> : '' }
          { auth.user ?
            <li><Link to="/" onClick={ logout }>← logout</Link></li> : '' }
        </ul>
      </div>
    </nav>
  </div>
)

Nav.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func
}

export default connect(state => ({
  ...state
}), dispatch => bindActionCreators({
  ...authActions
}, dispatch))(Nav)
