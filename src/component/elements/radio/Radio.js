import React from 'react';
import "./style.css";

export default function Radio(props) {
  const { className, inputProps, label, onChange, value } = props;
  const disableStyle = inputProps.disabled && 'disabled';
  const classes = ['radio', disableStyle, className].filter(Boolean).join(' ');

  return (
    <label className={classes}>
      <input disabled={inputProps.disabled} onChange={onChange} type="radio" value={value} {...inputProps} />
      <span />
      {label}
    </label>
  );
}

