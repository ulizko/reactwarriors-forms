import React from 'react'

const Field = (props) => {
  const {
    labelText,
    type,
    name,
    placeholder,
    value,
    onChange,
    error
  } = props
  return (
    <div className="form-group">
      <label htmlFor={name}>{ labelText }</label>
      <input
        type={ type }
        className="form-control"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      { error &&
      <div className="invalid-feedback">
        { error }
      </div> }

    </div>
  )
}

export default Field;
