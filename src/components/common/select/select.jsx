import React from "react";
const Select = ({name, label, options, defaultOption, error, ...rest}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}></label>
      <select
        name={name}
        id={name}
        defaultValue="default"
        {...rest}
        className="form-control"
      >
        <option value="default">{defaultOption}</option>
        {options.map((option) => (
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
