import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './EditorSettings.scss'

const EditorSettings = ({ meta, handleChange, isShown, toggle }) => {
  const toggleOnEnter = e => {
    if (e.charCode === 13) toggle()
  }

  return (
    <div className={ isShown ? s.rootIsShown : s.root }>
      <div className={ isShown ? s.wrapperIsShown : s.wrapper }>
        <div className={ s.meta }>
          <label className={ s.field } htmlFor="title">
            <span className={ s.placeholder }>title</span>
            <input
              name="title"
              type="text"
              onKeyPress={ toggleOnEnter }
              placeholder="title"
              value={ meta.title }
              onChange={ handleChange }
              className={ s.input }
            />
          </label>
          <label className={ s.field } htmlFor="description">
            <span className={ s.placeholder }>description</span>
            <input
              name="description"
              type="text"
              onKeyPress={ toggleOnEnter }
              placeholder="description"
              value={ meta.description }
              onChange={ handleChange }
              className={ s.input }
            />
          </label>
          <label className={ s.field } htmlFor="description">
            <span className={ s.placeholder }>tags</span>
            <input
              name="tags"
              type="text"
              onKeyPress={ toggleOnEnter }
              placeholder="tags"
              value={ meta.tags.join(', ') }
              onChange={ handleChange }
              className={ s.input }
            />
          </label>
        </div>
      </div>
      <div className={ isShown ? s.shadowIsShown : s.shadow } onClick={ toggle } />
    </div>
  )
}

const { bool, func, arrayOf, shape, string } = PropTypes

EditorSettings.propTypes = {
  handleChange: func.isRequired,
  isShown: bool.isRequired,
  meta: shape({
    title: string.isRequired,
    description: string,
    tags: arrayOf(string)
  }).isRequired,
  toggle: func.isRequired
}

export default withStyles(s)(EditorSettings)
