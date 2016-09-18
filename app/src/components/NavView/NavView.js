import React, { PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { Icon } from '../'
import s from './NavView.scss'

const NavView = ({
  description,
  email,
  github,
  isVisible,
  logout,
  title,
  toggleNav,
  toggleOnLinkClick,
  twitter,
  user
}) => (
  <div className={ s.wrapper }>
    <div className={ isVisible ? s.rootIsShown : s.root }>
      <div className={ s.content }>
        <div className={ s.contentTop }>
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
            { user ? [
              <Link
                onClick={ toggleOnLinkClick }
                className={ s.item }
                key="0"
                activeClassName={ s.itemActive }
                to="/admin/editor"
              >
                editor
              </Link>,
              <Link
                onClick={ toggleOnLinkClick }
                className={ s.itemLogout }
                key="1"
                to="/"
                onClick={ logout }
              >
                ← logout
              </Link>
            ] : '' }
          </div>
        </div>
        <div className={ s.footer }>
          <div className={ s.social }>
            <a
              className={ s.socialLink }
              href={ github }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" />
            </a>
            <a
              className={ s.socialLink }
              href={ twitter }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="twitter" />
            </a>
            <a
              className={ s.socialLink }
              href={ `mailto:${email}` }
            >
              <Icon name="paper-plane" />
            </a>
          </div>
          <div className={ s.copyright }>
            <span>
              <span className={ s.copyrightIcon }>&copy;</span>
              { ` ${new Date().getFullYear()} - portefólio` }
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      onTap={ toggleNav }
      onClick={ toggleNav }
      className={ isVisible ? s.shadowIsShown : s.shadow }
    />
    <div className={ s.navMobile }>
      <div className={ s.navMobileLogo }>
        <Icon name="logo" />
        <span>portefólio</span>
      </div>
    </div>
    <a
      onTap={ toggleNav }
      onClick={ toggleNav }
      className={ s.toggleBtn }
    >
      <Icon name="menu" />
    </a>
  </div>
)

NavView.propTypes = {
  description: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
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
