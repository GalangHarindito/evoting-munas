import React from 'react';
import "./style.css";

export default function Loaders(props) {
  const { use } = props;
  const classes = [`${use}-loader`].filter(Boolean).join(' ');
  return (
    <div className={classes} />
  )
}