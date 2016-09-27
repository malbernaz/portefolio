import React, { PropTypes } from 'react'
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

const SignIn = ({ handleSubmit, pristine, fields }) => {
  const renderInput = (field, type, label) =>
    <label key={ field.name } className={ s.field } htmlFor={ field.name }>
      <span className={ field.dirty ? s.placeholderDirty : s.placeholder }>
        { label }
      </span>
      <input
        className={ field.invalid && field.touched ? s.inputInvalid : s.input }
        name={ field.name }
        onBlur={ field.onBlur }
        onChange={ field.onChange }
        onFocus={ e => this[field.name].removeAttribute('readonly') && field.onFocus(e) }
        placeholder={ label }
        readOnly
        ref={ c => { this[field.name] = c } }
        type={ type }
        value={ field.value }
      />
      <span className={ s.error }>
        { field.touched ? field.error : '' }
      </span>
    </label>

  return (
    <Wrapper>
      <section className={ s.root }>
        <Helmet title="SIGN IN" />
        <form className={ s.form } onSubmit={ handleSubmit }>
          { map(fields, (field, key) => {
            const { type, label } = inputFields.filter(f => f.name === key)[0]
            return renderInput(field, type, label)
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

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.objectOf(PropTypes.object).isRequired,
  pristine: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'signin',
  fields: inputFields.map(field => field.name),
  validate
})(withStyles(s)(SignIn))
