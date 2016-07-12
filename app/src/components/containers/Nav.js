import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IndexLink, Link } from 'react-router'

import { Icon } from '../'

import config from '../../config'

import { auth as authActions } from '../../actions'

const Nav = ({ auth, logout }) => (
  <div className="nav">
    <a herf="#" className="nav__toggle">
      <Icon name="menu" />
      <span>menu</span>
    </a>
    <div className="nav__logo">
      <Icon className="nav__logo__icon" name="logo" />
      <h4 className="nav__logo__title">{ config.title }</h4>
      <span className="nav__logo__desc">{ config.description }</span>
    </div>
    <div className="nav__main">
      <IndexLink
        className="nav__main__item"
        activeClassName="nav__main__item--active"
        to="/"
      >
        home
      </IndexLink>
      <Link
        className="nav__main__item"
        activeClassName="nav__main__item--active"
        to="/about"
      >
        about
      </Link>
      <Link
        className="nav__main__item"
        activeClassName="nav__main__item--active"
        to="/contact"
      >
      contact
      </Link>
      { auth.user ?
        <Link
          className="nav__main__item"
          activeClassName="nav__main__item--active"
          to="/admin/editor"
        >
          editor
        </Link> : '' }
      { auth.user ?
        <Link
          className="nav__main__item--logout"
          to="/"
          onClick={ logout }
        >
          ← logout
        </Link> : '' }
    </div>
    <div className="nav__footer">
      <div className="nav__footer__social">
        <a
          className="nav__footer__social__link"
          href={ config.github }
          target="_blank"
        >
          <Icon name="github" />
        </a>
        <a
          className="nav__footer__social__link"
          href={ config.twitter }
          target="_blank"
        >
          <Icon name="twitter" />
        </a>
      </div>
      <div className="nav__footer__copyleft">
        <span>
          <span className="nav__footer__copyleft__icon">&copy;</span>
          <span className="nav__footer__copyleft__year">
            { ` ${new Date().getFullYear()}` }
          </span>
          { ' - portefólio' }
        </span>
      </div>
    </div>
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
