import React from 'react';
import './style.css'

export default function Select(props){
  const { className, input, inputProps, meta, options, label } = props;
  const { dirty, error, touched } = meta;
  const classes = [
    'inputSelect',
    //(!!input.value || !!inputProps.value) || 'empty',
    !!error && (dirty || touched) && 'error-input',
    className
  ].filter(Boolean).join(' ');

  return(
    <div className={'wrapper-select'}>
      <div >
      <label className='label'>{label}</label>
        <select className={classes} id={input.name} {...input} {...inputProps}>
          <option value="">{inputProps.placeholder}</option>
          {options.map((i, idx) => (
            <option key={idx} value={i.value}>{i.text}</option>
          ))}
        </select>
        {inputProps.helper && <p className='helper'>{inputProps.helper}</p>}
      </div>
      {!!error && (dirty || touched) && <small className='error'>{error}</small>}
    </div>
  );
}
