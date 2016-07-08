import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IndexLink, Link } from 'react-router'

import { Icon } from '../'

import config from '../../config'

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
        <h4>{ config.head.title }</h4>
        <span>{ config.description }</span>
      </div>
      <div className="main-nav">
        <ul>
          <li>
            <IndexLink
              className="main-nav__item"
              activeClassName="main-nav__item--active"
              to="/"
            >
              home
            </IndexLink>
          </li>
          <li>
            <Link
              className="main-nav__item"
              activeClassName="main-nav__item--active"
              to="/about"
            >
              about
            </Link>
          </li>
          <li>
            <Link
              className="main-nav__item"
              activeClassName="main-nav__item--active"
              to="/contact"
            >
            contact
            </Link>
          </li>
          { auth.user ?
            <li>
              <Link
                className="main-nav__item"
                activeClassName="main-nav__item--active"
                to="/admin"
              >
                editor
              </Link>
            </li> : '' }
          { auth.user ?
            <li className="logout">
              <Link className="main-nav__item" to="/" onClick={ logout }>
                ← logout
              </Link>
            </li> : '' }
        </ul>
      </div>
      <div className="nav-footer">
        <a href={ config.github } target="_blank">
          <Icon name="github" />
        </a>
        <a href={ config.github } target="_blank">
          <Icon name="twitter" />
        </a>
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
