import React, { useEffect, useState } from 'react';
import './style.css';
//import { saveData } from '../../../utils/storage';
//import toBase64 from '../../../utils/fileTobase64';

export default function ImageField(props) {
  const { caption, className, fieldName, file,
    input, inputProps, label, meta, onShow, rules, image, onChange
  } = props;

  let { active, dirty, error, touched } = meta;
  error = error || rules;
  const classes = [
    'root',
    //!file.name && 'empty',
    active && 'focus',
    !!error && (dirty || touched) && 'error',
    className
  ].filter(Boolean).join(' ');
  useEffect(() => {
    setSelectedImage(file)
  })

  delete input.value;
  const [selectedImage, setSelectedImage] = useState(file);

  //if (!error && file && file.lastModified){
  //  toBase64(file).then( res => {
  //    saveData(fieldName, res);
  //  });
  //}

  const imageNone = ( <div className='image-profile' style={{backgroundImage:`url(${image})`}}>
    {/*<img alt="not fount" width={"250px"} src={noImage} />
    <br />
    <button onClick={()=>setSelectedImage(null)}>Remove</button>*/}
    </div>) 

const pickImage =  selectedImage && <div className='image-profile' style={{backgroundImage:`url(${URL.createObjectURL(selectedImage)})`}}>
  {/*<img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />*/}
  <br />
  {/*<button onClick={()=>setSelectedImage(null)}>Remove</button>*/}
  </div>


  return (
    <div className={classes}>
      <label>
        {label}
        {/*{file.type && file.type.indexOf('image') > -1 &&<a onClick={onShow}>show</a>}*/}
      </label>
      {selectedImage ? pickImage : imageNone }
      <section>
        {/*<p>{file.name ? file.name : 'Belum ada file dipilih'}</p>*/}
        <input {...input} {...inputProps} type="file" />
      </section>
      <small>
        {(!!error && (dirty || touched) && error) || caption}
      </small>
    </div>
  );
}

