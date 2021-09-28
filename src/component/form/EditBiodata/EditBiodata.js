import React, {useEffect, useState} from "react";
import { Field, FieldArray } from "redux-form";
import "./style.css";
import Button from "../../elements/button/Button";
import Text from "../../field/text/Text";
import Select from "../../field/select/Select";
import RadioGroup from "../../field/radioGroup/RadioGroup";
import ImageField from "../../field/Image/Image";
import { useSelector } from "react-redux";
import imageEmpty from '../../../assets/blank-person2.svg';
import { angkatanKuliah } from "../../../utils/format";
import { fileAccept } from '../../../utils/format'

export default function EditBiodataForm (props) {
  const { 'editBiodataForm':dataForm } = useSelector(s => s.form);
 
  const [size, setSize] = useState(false)

  const { values } = dataForm;
  const {
    data,
    dataAccount,
    initialize,
    handleSubmit,
    optionGender,
    isLoading,
  } = props;
  const { photo } = data;
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const { fullName, phoneNumber, nim, angkatan, gender, photo } = data;
    const { email } = dataAccount
    initialize({...values, 
      fullName:fullName,
      phoneNumber:phoneNumber,
      email:email,
      nim:nim,
      angkatan:angkatan,
      gender:gender,
      photo:photo
    });
  },[data])

  const handlePhoto = (event) => {
    setSelectedImage(event.target.files[0])
    return event.target.files[0]
  }

  const error = () => {
    if(selectedImage){
      if(Number(selectedImage.size) / 1024 > 1024){
        return 'File tidak lebih besar dari 1MB'
      }
    }else{
      return ''
    }
    return ''
  }

  const fileType = ['image/png', 'image/jpg', 'image/jpeg'];

  return (
    <form className='editBiodataForm' onSubmit={handleSubmit} >
      <section>
      <Field
        component={ImageField}
        name="photo"
        onChange={(event) => {
          handlePhoto(event)
        }}
        file={selectedImage}
        image={photo? photo : imageEmpty}
        caption = {`Maksimal 1MB. Ekstensi file: ${fileAccept(fileType)}`}
        rules={ error() }
      />

      </section>
      <section>
        <Field component={Text} label='Nama Lengkap' name='fullName'  />
      </section>
      <section>
        <Field component={Text} label='Nomer Handphone' name='phoneNumber' disabled={true} />
      </section>
      <section>
        <Field component={Text} label='Email' name='email' disabled={true} />
      </section>
      <section>
        <Field component={Text} label='Nomer Induk Mahasiswa' name='nim' />
      </section>
      <div className='group-1'>
        <section>
          <Field
            component={Select}
            label='Angkatan'
            name='angkatan'
            options={angkatanKuliah}
            inputProps={{ placeholder: "" }}
          />
        </section>
        <section>
          <Field
            component={RadioGroup}
            label='Jenis Kelamin'
            name='gender'
            options={optionGender}
          />
        </section>
      </div>
      <section className='form-button'>
        <Button
          label={"Simpan"}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          disabled={size}
        />
      </section>
    </form>
  );
}
