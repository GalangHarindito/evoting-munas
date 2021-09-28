import React from 'react';
import "./style.css";

export default function TextArea(props) {
  const { className, input, inputProps, label, lined,
    meta, rules, type, disabled, rows, cols  } = props;
  let { active, dirty, error, touched } = meta;

  error = error || rules;

 const classes =   [
    'textArea',
    lined ? 'rootline' : 'rootbox',
    active && 'focus',
    !!error && (dirty || touched) && 'error',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
    {label && <label>{label}</label>}
    <div>
      <textarea id={input.name} {...input} {...inputProps} disabled={disabled} />
    </div>
    {!!error && (dirty || touched) && <small>{error}</small>}
  </div>
);
}