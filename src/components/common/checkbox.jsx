import React from "react";

const Checkbox = (props) => {
  return (
    <div className="mb-3 form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id="exampleCheck1"
      ></input>
      <label className="form-check-label" for="exampleCheck">
        Check me out
      </label>
    </div>
  );
};

export default Checkbox;
