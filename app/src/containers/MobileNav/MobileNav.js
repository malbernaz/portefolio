import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import * as navActions from '../../actions/ui/nav'
import { Icon } from '../../components'
import s from './MobileNav.scss'

const MobileNav = ({ toggleNav }) => {
  const toggle = e => {
    e.preventDefault()

    toggleNav()
  }

  return (
    <div className={ s.navMobile }>
      <a onClick={ toggle } className={ s.toggleBtn }>
        <Icon name="menu" />
      </a>
      <div className={ s.navMobileLogo }>
        <Icon name="logo" />
        <span>portefólio</span>
      </div>
    </div>
  )
}

MobileNav.propTypes = {
  toggleNav: PropTypes.func
}

export default connect(
  null,
  dispatch => bindActionCreators({
    ...navActions
  }, dispatch)
)(withStyles(s)(MobileNav))
