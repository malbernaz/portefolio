import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { Icon } from '../'
import s from './DropdownButton.scss'

const DropdownButton = ({ options, fixedOptions, isShown, toggleDropdown }) =>
  <div className={ s.root }>
    <a onClick={ toggleDropdown } className={ s.toggle }><Icon name="more" /></a>
    <div className={ isShown ? s.options : s.optionsHidden }>
      { options.map((o, i) =>
        <a className={ s.option } key={ i } onClick={ o.action }>
          { o.label }
        </a>
      ) }
      { fixedOptions.map((o, i) =>
        <a
          className={ o.label === 'delete' ? s.optionDanger : s.option }
          key={ i }
          onClick={ o.action }
        >
          { o.label }
        </a>
      ) }
    </div>
    <div onClick={ toggleDropdown } className={ isShown ? s.shadowIsShown : s.shadow } />
  </div>

DropdownButton.propTypes = {
  options: PropTypes.array.isRequired,
  fixedOptions: PropTypes.array.isRequired,
  isShown: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired
}

export default withStyles(s)(DropdownButton)
