import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import _ from 'underscore'

const formFactory = ({
  validate,
  styleClass,
  formName,
  inputFields,
  submitText
}) => {
  const Form = ({ handleSubmit, fields: { ...fields } }) => {
    const renderInput = (field, type, label) => (
      <div className="field" key={field.name}>
        <label htmlFor={field.name}>
          <span className={field.dirty ? 'hasvalue' : ''}>
            {label}
          </span>
          <input
            type={type}
            name={field.name}
            placeholder={label}
            className={field.invalid && field.touched ? 'invalid' : ''}
            {...field}
          />
        </label>
        <span className="errors">
          {field.touched ? field.error : ''}
        </span>
      </div>
    )

    return (
      <form className={styleClass} onSubmit={handleSubmit}>
        {
          _.map(fields, (field, key) => {
            const { type, label } = inputFields.filter(f => f.name === key)[0]
            return renderInput(field, type, label)
          })
        }
        <div className="cta">
          <button className="btn large" onClick={handleSubmit}>
            {submitText}
          </button>
        </div>
      </form>
    )
  }

  Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired
  }

  return reduxForm({
    form: formName,
    fields: inputFields.map(field => field.name),
    validate
  })(Form)
}

export default formFactory
