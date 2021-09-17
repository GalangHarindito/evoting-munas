import React from 'react';
import "./style.css";

export default function Text(props) {
  const { className, input, inputProps, label, lined,
    meta, rules, startAdornment, endAdornment, type  } = props;
  let { active, dirty, error, touched } = meta;

  error = error || rules;
  const typeInput = type === 'date' ? 'date' : 'text'
 const classes =   [
    'textField',
    lined ? 'rootline' : 'rootbox',
    active && 'focus',
    !!error && (dirty || touched) && 'error',
    className
  ].filter(Boolean).join(' ');

  const adornment = (e) => typeof e === 'string' ? !!input.value : true;

  return (
    <div className={classes}>
    {label && <label>{label}</label>}
    <div>
      {startAdornment && adornment(startAdornment) && (<span>{startAdornment}</span>)}
      <input id={input.name} {...input} {...inputProps} type={typeInput} />
      {endAdornment && adornment(endAdornment) && (<span>{endAdornment}</span>)}
    </div>
    {!!error && (dirty || touched) && <small>{error}</small>}
  </div>
);
}