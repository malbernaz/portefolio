import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { map } from 'underscore'
import Helmet from 'react-helmet'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import validate from './SignInFormValidation'
import s from './SignInForm.scss'
import { Wrapper } from '../../components'

const inputFields = [{
  name: 'email',
  type: 'email',
  label: 'email'
}, {
  name: 'password',
  type: 'password',
  label: 'password'
}]


@withStyles(s)
@reduxForm({ form: 'signin', fields: inputFields.map(field => field.name), validate })
export default class SignIn extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    fields: PropTypes.objectOf(PropTypes.object),
    pristine: PropTypes.bool,
  }

  onFocus = (e, field) => {
    this[`field__${field.name}`].removeAttribute('readonly')

    field.onFocus(e)
  }

  renderInput = (field, type, label) =>
    <label key={ field.name } className={ s.field } htmlFor={ field.name }>
      <input
        className={ field.invalid && field.touched ? s.inputInvalid : s.input }
        name={ field.name }
        onBlur={ field.onBlur }
        onChange={ field.onChange }
        onFocus={ e => this.onFocus(e, field) }
        placeholder={ label }
        readOnly
        ref={ c => { this[`field__${field.name}`] = c } }
        type={ type }
        value={ field.value }
      />
      <span className={ field.dirty ? s.placeholderDirty : s.placeholder }>
        { label }
      </span>
      <span className={ s.error }>
        { field.touched ? field.error : '' }
      </span>
    </label>

  render () {
    const { handleSubmit, pristine, fields } = this.props

    return (
      <Wrapper>
        <section className={ s.root }>
          <Helmet title="SIGN IN" />
          <form className={ s.form } onSubmit={ handleSubmit }>
            { map(fields, (field, key) => {
              const { type, label } = inputFields.filter(f => f.name === key)[0]
              return this.renderInput(field, type, label)
            }) }
            <div className="cta">
              <button
                className={ s.submit }
                disabled={ pristine }
                onClick={ handleSubmit }
              >
                Sign In
              </button>
            </div>
          </form>
        </section>
      </Wrapper>
    )
  }
}
