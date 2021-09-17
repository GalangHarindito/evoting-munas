import React, { useState } from 'react';
import * as image from '../../../utils/Images';
import './style.css';

export default function Password(props) {
  const { className, input, inputProps, label, rules, meta } = props;
  let { active, dirty, error, touched } = meta;
  const classes = ['passwordField', active && 'focus', className].filter(Boolean).join(' ');
  error = error || rules;
  const [show, setShow] = useState(false);

  return (
    <div className={classes}>
      {label && <label>{label}</label>}
      <div className='textPassword'>
        <input
          {...input}
          {...inputProps}
          type={show ? 'text' : 'password'}
        />
        <button onClick={() => setShow(!show)} type='button'>
          <img
            alt={show ? 'show' : 'hide'}
            src={`${show ? image.icPasswordShow : image.icPasswordHide}`}
          />
        </button>
      </div>
      {!!error && (dirty || touched) && <small>{error}</small>}
    </div>
  );
}