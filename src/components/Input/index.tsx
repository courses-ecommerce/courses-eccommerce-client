import classnames from "classnames";
import React, { useState } from "react";
import Icon from "../Icon/Icon";
import "./Input.scss";

const Input = React.forwardRef(
  (props: InputProps, ref?: React.LegacyRef<HTMLInputElement>) => {
    const {
      label,
      type,
      className = "",
      name,
      errorMessage,
      icon,
      disabled,
      sizeIcon = 18,
      hint,
      hideErrorMessage = false,
      required,
      autoComplete,
      accept,
      ...rest
    } = props;

    const [focused, setFocused] = useState(false);
    const [show, setShow] = useState(false);

    return (
      <div className={classnames("input-container", className)}>
        {label && (
          <div className="input-label">
            {label} {required && <span className="input-require-mark">*</span>}
          </div>
        )}

        <div
          className={classnames("input", {
            focused,
            disabled,
          })}
        >
          <div className="input-form">
            <input
              // required={required}
              name={name}
              type={show ? "text" : type}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              disabled={disabled}
              autoComplete={autoComplete}
              ref={ref}
              accept={accept}
              {...rest}
            />
          </div>

          {icon && (
            <Icon
              className="input-icon"
              size={sizeIcon}
              icon={icon}
              color={"#94A3B8"}
            />
          )}

          {type === "password" && (
            <div
              className="input-icon"
              onClick={() => setShow(!show)}
              style={{ paddingRight: "1.6rem" }}
            >
              <Icon
                size={18}
                icon={show ? "eye" : "eye-slash"}
                color={"#94A3B8"}
              />
            </div>
          )}
        </div>
        {!hideErrorMessage && <div className="input-error">{errorMessage}</div>}

        {hint && <div className="input-hint">{hint}</div>}
      </div>
    );
  }
);

export default Input;
