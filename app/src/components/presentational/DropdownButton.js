import React, { PropTypes } from 'react'

import { Icon } from '../'

const block = 'dropdown-button'

const DropdownButton = ({ options, fixedOptions, isShown, toggleDropdown }) => (
  <div className={ block }>
    <a href="#" onClick={ e => toggleDropdown(e) } className={ `${block}__toggle` }>
      <Icon name="more" />
    </a>
    <div className={ isShown ? `${block}__options` : `${block}__options--hidden` }>
      { options.map((o, i) =>
        <a
          href="#"
          className={ `${block}__options__option` }
          key={ i }
          onClick={ e => o.action(e) }
        >
          { o.label }
        </a>
      ) }
      { fixedOptions.map((o, i) =>
        <a
          href="#"
          className={ o.label === 'delete' ?
            `${block}__options__option--danger` :
            `${block}__options__option` }
          key={ i }
          onClick={ e => o.action(e) }
        >
          { o.label }
        </a>
      ) }
    </div>
  </div>
)

DropdownButton.propTypes = {
  options: PropTypes.array.isRequired,
  fixedOptions: PropTypes.array.isRequired,
  isShown: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired
}

export default DropdownButton
