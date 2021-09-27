import React from 'react';
import Loaders from '../loaders/Loaders';
import "./style.css";

export default function Button(props) {
  const { buttonProps, label, className, disabled, isLoading, onClick, use } = props;
  const classes = ['button', disabled && 'disabled', className].filter(Boolean).join(' ');

  return (
    <button className={classes} disabled={disabled} onClick={onClick} {...buttonProps}>
      {isLoading ? <Loaders use={'button'} /> : label}
    </button>
  );
}