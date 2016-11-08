import React, { PropTypes, Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './EditorSettings.scss'

const toggleOnEnter = (e, toggle) => {
  if (e.charCode === 13) toggle()
}

const { bool, func, arrayOf, shape, string } = PropTypes

@withStyles(s)
export default class EditorSettings extends Component {
  static propTypes = {
    handleChange: func.isRequired,
    isShown: bool.isRequired,
    meta: shape({
      title: string.isRequired,
      description: string,
      tags: arrayOf(string)
    }).isRequired,
    toggle: func.isRequired
  }

  componentWillReceiveProps ({ isShown }) {
    if (isShown) {
      setTimeout(() => {
        if (!this.wasNotFocused) {
          this.title.focus()
          this.title.select()
        }

        this.wasNotFocused = true
      }, 0)
    }

    if (!isShown) {
      this.wasNotFocused = false
    }
  }

  render () {
    const { meta, handleChange, isShown, toggle } = this.props

    return (
      <div className={ isShown ? s.rootIsShown : s.root }>
        <div className={ isShown ? s.wrapperIsShown : s.wrapper }>
          <div className={ s.meta }>
            <label className={ s.field } htmlFor="title">
              <span className={ s.placeholder }>title</span>
              <input
                className={ s.input }
                name="title"
                onChange={ handleChange }
                onKeyPress={ e => toggleOnEnter(e, toggle) }
                placeholder="title"
                ref={ c => { this.title = c } }
                type="text"
                value={ meta.title }
              />
            </label>
            <label className={ s.field } htmlFor="description">
              <span className={ s.placeholder }>description</span>
              <input
                className={ s.input }
                name="description"
                onChange={ handleChange }
                onKeyPress={ e => toggleOnEnter(e, toggle) }
                placeholder="description"
                type="text"
                value={ meta.description }
              />
            </label>
            <label className={ s.field } htmlFor="description">
              <span className={ s.placeholder }>tags</span>
              <input
                className={ s.input }
                name="tags"
                onChange={ handleChange }
                onKeyPress={ e => toggleOnEnter(e, toggle) }
                placeholder="tags"
                type="text"
                value={ meta.tags.join(', ') }
              />
            </label>
          </div>
        </div>
        <div className={ isShown ? s.shadowIsShown : s.shadow } onClick={ toggle } />
      </div>
    )
  }
}
