import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Icon from '../Icon'
import s from './NavView.scss'

@withStyles(s)
export default class NavView extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    toggleNav: PropTypes.func.isRequired,
    toggleOnLinkClick: PropTypes.func.isRequired,
    twitter: PropTypes.string.isRequired,
    user: PropTypes.object // eslint-disable-line react/forbid-prop-types
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isVisible !== this.props.isVisible) {
      requestAnimationFrame(() => {
        const navClassName = this.nav.className
        const shadowClassName = this.shadow.className

        requestAnimationFrame(() => {
          this.nav.className = navClassName === s.rootIsShown ?
            s.root : s.rootIsShown
          this.shadow.className = shadowClassName === s.shadowIsShown ?
            s.shadow : s.shadowIsShown
        })
      })
    }
  }

  render () {
    const {
      description,
      email,
      github,
      logout,
      title,
      toggleNav,
      toggleOnLinkClick,
      twitter,
      user
    } = this.props

    return (
      <div className={ s.wrapper }>
        <div ref={ c => { this.nav = c } } className={ s.root }>
          <div className={ s.content }>
            <div className={ s.contentTop }>
              <div className={ s.logo }>
                <Icon className={ s.logoIcon } name="logo" />
                <h4 className={ s.logoTitle }>{ title }</h4>
                <span className={ s.logoDescription }>{ description }</span>
              </div>
              <div className={ s.navMain }>
                <Link
                  onClick={ toggleOnLinkClick }
                  className={ s.item }
                  activeClassName={ s.itemActive }
                  to="/blog"
                >
                  writing
                </Link>
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
                    onClick={ logout }
                    className={ s.itemLogout }
                    key="1"
                    to="/blog"
                  >
                    logout
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
                <a className={ s.socialLink } href={ `mailto:${email}` }>
                  <Icon name="paper-plane" />
                </a>
              </div>
              <div className={ s.copyright }>
                <span>
                  <span className={ s.copyrightIcon }>©</span>
                  { ` ${new Date().getFullYear()} - ${title}` }
                </span>
              </div>
            </div>
          </div>
        </div>
        <div onClick={ toggleNav } ref={ c => { this.shadow = c } } className={ s.shadow } />
      </div>
    )
  }
}
