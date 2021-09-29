import React from "react";
import Radio from "../../elements/radio";
import "./style.css";

export default function RadioGroup(props) {
  const { className, disabled, input, label, options, meta } = props;
  let { dirty, error, touched } = meta;
  const classes = ["radio-group", !!error && (dirty || touched) && 'error', className].filter(Boolean).join(" ");

  return (
    <div className='wrapper-radio' style={{marginTop: '0.4rem'}}>
      <div className={classes}>
        <label>{label}</label>
        {options.map((option, idx) => {
          const { onChange, value: inputValue } = input;
          const { label, value, exp } = option;
          const handleChange = () => onChange(value);
          const checked = inputValue === value;

          return (
            <div key={`radio-${idx}`}>
              <Radio
                inputProps={{ checked, disabled }}
                label={label}
                onChange={handleChange}
                value={value}
              />
              <small>{exp}</small>
            </div>
          );
        })}
      </div>
      {!!error && (dirty || touched) && <small>{error}</small>}
    </div>
  );
}
