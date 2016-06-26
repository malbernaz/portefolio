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

    return (
      <div className="dropdown-button">
        <a href="#" onClick={e => this.toggleDropdown(e)} className="dropdown-toggle">
          <Icon name="more" />
        </a>
        <div className={dropdownHidden ? 'dropdown-options hidden' : 'dropdown-options'}>
          {options.map((o, i) =>
            <a href="#" key={i} onClick={e => o.action(e)}>
              {o.label}
            </a>
          )}
          {fixedOptions.map((o, i) =>
            <a href="#" key={i} onClick={e => o.action(e)}>
              {o.label}
            </a>
          )}
        </div>
      </div>
    )
  }
}

export default DropdownButton
