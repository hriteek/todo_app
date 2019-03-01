import React from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

const Input = ({
  type,
  placeholder,
  error,
  value,
  disabled,
  onChange,
  name,
  info
}) => {
  return (
    <div className="form-group">
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.string
};

Input.defaultProps = {
  type: "text"
};

export default Input;
