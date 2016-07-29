import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { map } from 'underscore'
import Helmet from 'react-helmet'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import validation from './SignInFormValidation'
import s from './SignInForm.scss'

const inputFields = [{
  name: 'email',
  type: 'email',
  label: 'email'
}, {
  name: 'password',
  type: 'password',
  label: 'password'
}]

const SignIn = ({ handleSubmit, pristine, fields: { ...fields } }) => {
  const renderInput = (field, type, label) => (
    <div key={ field.name }>
      <label className={ s.field } htmlFor={ field.name }>
        <span className={ field.dirty ? s.placeholderDirty : s.placeholder }>
          { label }
        </span>
        <input
          type={ type }
          name={ field.name }
          placeholder={ label }
          className={ field.invalid && field.touched ? s.inputInvalid : s.input }
          { ...field }
        />
        <span className={ s.error }>
          { field.touched ? field.error : '' }
        </span>
      </label>
    </div>
  )

  return (
    <section className={ s.root }>
      <Helmet title="SIGN IN" />
      <form className={ s.form } onSubmit={ handleSubmit }>
        { map(fields, (field, key) => {
          const { type, label } = inputFields.filter(f => f.name === key).pop()
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
  )
}

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'signin',
  fields: inputFields.map(field => field.name),
  validation
})(withStyles(s)(SignIn))
