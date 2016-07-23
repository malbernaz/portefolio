import React, { PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { Icon } from '../'
import s from './NavView.scss'

const NavView = ({
  description,
  github,
  isVisible,
  logout,
  title,
  toggleNav,
  toggleOnLinkClick,
  twitter,
  user
}) => (
  <div>
    <div className={ isVisible ? s.isShown : s.root }>
      <div className={ s.logo }>
        <Icon className={ s.logoIcon } name="logo" />
        <h4 className={ s.logoTitle }>{ title }</h4>
        <span className={ s.logoDescription }>{ description }</span>
      </div>
      <div className={ s.navMain }>
        <IndexLink
          onClick={ toggleOnLinkClick }
          className={ s.item }
          activeClassName={ s.itemActive }
          to="/"
        >
          home
        </IndexLink>
        <Link
          onClick={ toggleOnLinkClick }
          className={ s.item }
          activeClassName={ s.itemActive }
          to="/about"
        >
          about
        </Link>
        <Link
          onClick={ toggleOnLinkClick }
          className={ s.item }
          activeClassName={ s.itemActive }
          to="/contact"
        >
        contact
        </Link>
        { user ?
          <Link
            onClick={ toggleOnLinkClick }
            className={ s.item }
            activeClassName={ s.itemActive }
            to="/admin/editor"
          >
            editor
          </Link> : '' }
        { user ?
          <Link
            onClick={ toggleOnLinkClick }
            className={ s.itemLogout }
            to="/"
            onClick={ logout }
          >
            ← logout
          </Link> : '' }
      </div>
      <div className={ s.footer }>
        <div className={ s.social }>
          <a
            className={ s.socialLink }
            href={ github }
            target="_blank"
          >
            <Icon name="github" />
          </a>
          <a
            className={ s.socialLink }
            href={ twitter }
            target="_blank"
          >
            <Icon name="twitter" />
          </a>
        </div>
        <div className={ s.copyright }>
          <span>
            <span className={ s.copyrightIcon }>&copy;</span>
            { ` ${new Date().getFullYear()} - portefólio` }
          </span>
        </div>
      </div>
      <div
        onClick={ e => toggleNav(e) }
        className={ isVisible ? s.shadowIsShown : s.shadow }
      >
      </div>
    </div>
    <div className={ s.navMobile }>
      <div className={ s.navMobileLogo }>
        <Icon name="logo" />
        <span>portefólio</span>
      </div>
    </div>
    <a href="#" onClick={ e => toggleNav(e) } className={ s.toggleBtn }>
      <Icon name="menu" />
    </a>
  </div>
)

NavView.propTypes = {
  description: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toggleNav: PropTypes.func.isRequired,
  toggleOnLinkClick: PropTypes.func.isRequired,
  twitter: PropTypes.string.isRequired,
  user: PropTypes.object
}

export default withStyles(s)(NavView)
