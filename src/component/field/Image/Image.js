import React, { useEffect, useState } from "react";
import "./style.css";

export default function ImageField(props) {
  const {
    caption,
    className,
    file,
    input,
    inputProps,
    label,
    meta,
    rules,
    image,
  } = props;

  let { active, dirty, error, touched } = meta;
  error = error || rules;
  const classes = [
    "root",
    active && "focus",
    !!error && (dirty || touched) && "error",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  useEffect(() => {
    setSelectedImage(file);
  });

  delete input.value;
  const [selectedImage, setSelectedImage] = useState(file);

  const imageNone = (
    <div
      className='image-profile'
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );

  const pickImage = selectedImage && (
    <div
      className='image-profile'
      style={{ backgroundImage: `url(${URL.createObjectURL(selectedImage)})` }}
    >
      <br />
    </div>
  );

  return (
    <div className={classes}>
      <label>{label}</label>
      {selectedImage ? pickImage : imageNone}
      <section>
        <input {...input} {...inputProps} type='file' />
      </section>
      <small>{(!!error && (dirty || touched) && error) || caption}</small>
    </div>
  );
}
