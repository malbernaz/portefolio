import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { map } from 'underscore'

const formFactory = ({
  validate,
  styleClass,
  formName,
  inputFields,
  submitText
}) => {
  const Form = ({ handleSubmit, fields: { ...fields } }) => {
    const renderInput = (field, type, label) => (
      <div key={ field.name }>
        <label className={ `${styleClass}__field` } htmlFor={ field.name }>
          <span
            className={ field.dirty ?
              `${styleClass}__field__placeholder ${styleClass}__field__placeholder--hasvalue` :
              `${styleClass}__field__placeholder` }
          >
            { label }
          </span>
          <input
            type={ type }
            name={ field.name }
            placeholder={ label }
            className={ field.invalid && field.touched ?
              `${styleClass}__field__input ${styleClass}__field__input--invalid` :
              `${styleClass}__field__input` }
            { ...field }
          />
          <span className={ `${styleClass}__field__errors` }>
            { field.touched ? field.error : '' }
          </span>
        </label>
      </div>
    )

    return (
      <form className={ styleClass } onSubmit={ handleSubmit }>
        { map(fields, (field, key) => {
          const { type, label } = inputFields.filter(f => f.name === key)[0]
          return renderInput(field, type, label)
        }) }
        <div className="cta">
          <button className={ `${styleClass}__submit btn large` } onClick={ handleSubmit }>
            { submitText }
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
