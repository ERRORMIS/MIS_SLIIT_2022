const FormRow = ({ type, name, value, handleChange, labelText, validateField }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        onKeyUp={validateField}
        className='form-input'
      />
    </div>
  )
}

export default FormRow
