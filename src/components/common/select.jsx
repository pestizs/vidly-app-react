import React from "react";

//This is a destructuring of the props object. It allows the component to
//directly access the name, label, value, error, and onChange props
//without using props.name, props.label, etc.
const Select = ({ name, label, options = {}, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="" />
        {Array.isArray(options) &&
          options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
