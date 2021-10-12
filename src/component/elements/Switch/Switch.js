import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";

export default function SwitchCheck(props) {
  const { nameSwitch, checked, verified, message} = props;

  const [toggle, setToggle] = useState(checked);
  useEffect(() => {
    setToggle(checked)
  })
  const onclick = () => {
    setToggle(!toggle);
    verified(!toggle);
    //params.checked = toggle;
  };

  
  return (
    <>
    <Switch
      name={nameSwitch}
      checked={toggle}
      onChange={onclick}
      inputProps={{ "aria-label": "controlled" }}
      color='warning'
    />
    <label style={{fontSize:'0.7rem', fontWeight:'bold', color:toggle?'var(--primary-color)':'grey'}}>{toggle? 'Verified' : 'Unverified' }</label>
    </>
  );
}
