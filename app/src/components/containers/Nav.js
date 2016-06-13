import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IndexLink, Link } from 'react-router'

import { auth as authActions } from '../../actions'

const Nav = ({ auth, logout }) => (
  <nav>
    <ul>
      <li><IndexLink to="/">home</IndexLink></li>
      <li><IndexLink to="/about">about</IndexLink></li>
      <li><IndexLink to="/contact">contact</IndexLink></li>
      {
        auth.user ?
          <li><Link to="/admin">admin</Link></li> :
          ''
      } {
        auth.user ?
          <li><Link to="/" onClick={logout}>logout</Link></li> :
          ''
      }
    </ul>
  </nav>
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
