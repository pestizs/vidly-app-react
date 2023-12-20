import React from "react";

//This is a destructuring of the props object. It allows the component to
//directly access the name, label, value, error, and onChange props
//without using props.name, props.label, etc.
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input {...rest} name={name} id={name} className="form-control"></input>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
