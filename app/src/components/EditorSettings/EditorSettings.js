import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './EditorSettings.scss'

const EditorSettings = ({ meta, handleChange, isShown }) =>
  <div className={ s.wrapper }>
    <div className={ isShown ? s.rootIsShown : s.root }>
      <div className={ s.meta }>
        <Dropzone className={ s.dropzone }>
          <p>post image (drop it here)</p>
        </Dropzone>
        <label className={ s.field } htmlFor="title">
          <span className={ s.placeholder }>title</span>
          <input
            name="title"
            type="text"
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
            placeholder="tags"
            value={ meta.tags.join(', ') }
            onChange={ handleChange }
            className={ s.input }
          />
        </label>
      </div>
    </div>
  </div>

EditorSettings.propTypes = {
  handleChange: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  meta: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
}

export default withStyles(s)(EditorSettings)
