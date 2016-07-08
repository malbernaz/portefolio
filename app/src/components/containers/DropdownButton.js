import React, { Component, PropTypes } from 'react'

import { Icon } from '../'

class DropdownButton extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    fixedOptions: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)

    this.state = { dropdownHidden: true }
  }

  componentWillReceiveProps = () => this.setState({ dropdownHidden: true })

  toggleDropdown = e => {
    e.preventDefault()

    this.setState({ dropdownHidden: !this.state.dropdownHidden })
  }

  render() {
    const { dropdownHidden } = this.state
    const { options, fixedOptions } = this.props

    const block = 'dropdown-button'

    return (
      <div className={ block }>
        <a href="#" onClick={ e => this.toggleDropdown(e) } className={ `${block}__toggle` }>
          <Icon name="more" />
        </a>
        <div
          className={ dropdownHidden ?
            `${block}__options ${block}__options--hidden` :
            `${block}__options` }
        >
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
                `${block}__options__option ${block}__options__option--danger` :
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
  }
}

export default DropdownButton
