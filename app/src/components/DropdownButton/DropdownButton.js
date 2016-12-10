import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Icon from '../Icon'
import s from './DropdownButton.scss'

const DropdownButton = ({ options, isShown, toggleDropdown }) => (
  <div className={ s.root }>
    <a onClick={ toggleDropdown } className={ s.toggle }>
      <Icon name="more" />
    </a>
    <div className={ isShown ? s.options : s.optionsHidden }>
      { options.map((o, i) =>
        <a className={ o.danger ? s.optionDanger : s.option } key={ i } onClick={ o.action }>
          { o.label }
        </a>
      ) }
    </div>
    <div onClick={ toggleDropdown } className={ isShown ? s.shadowIsShown : s.shadow } />
  </div>
)

const { arrayOf, bool, shape, string, func } = PropTypes

DropdownButton.propTypes = {
  options: arrayOf(shape({
    label: string.isRequired,
    action: func.isRequired
  })).isRequired,
  isShown: bool.isRequired,
  toggleDropdown: func.isRequired
}

export default withStyles(s)(DropdownButton)
