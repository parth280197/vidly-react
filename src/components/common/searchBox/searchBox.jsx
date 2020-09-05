import React from "react";

const SearchBox = ({onChange, name, label, ...rest}) => {
  return (
    <input
      onChange={({currentTarget}) => {
        onChange(currentTarget.value);
      }}
      className="form-control"
      {...rest}
    />
  );
};

export default SearchBox;
