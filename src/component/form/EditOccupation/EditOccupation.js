import React, {useEffect} from 'react';
import './style.css';
import { Field } from 'redux-form';
import Text from '../../field/text/Text';
import Select from '../../field/select/Select';
import Button from '../../elements/button/Button';
import TextArea from '../../field/textArea/TextArea';
import { useSelector } from 'react-redux';

export default function EditOccupation(props) {
  const { 'editOccupationForm':dataForm } = useSelector(s => s.form);
  const { values } = dataForm;
  const {
    data, 
    optionOccupation,
    initialize,
    handleSubmit,
    isLoading,
  } = props;

  useEffect(() => {
    const { occupation, officeName, jobTitle, officeAddress } = data;
    initialize({...values, 
      occupation:occupation,
      officeName:officeName,
      jobTitle:jobTitle,
      officeAddress:officeAddress,
    });
  },[data])
  return(
      <form className='editOccupationForm' onSubmit={handleSubmit}>
        <div>
        <div className='form-select'>
        <section>
          <Field component={Select} label='Jenis Pekerjaan' name='occupation' inputProps={{ placeholder: "" }} options={optionOccupation} />
        </section>
        <section>
          <Field component={Text} label='Jabatan' name='jobTitle' />
        </section>
        <section>
          <Field component={Text} label='Nama Kantor/Instansi' name='officeName'  />
        </section>
        </div>
        <section>
          <Field component={TextArea} label='Alamat Kantor/Instansi' name='officeAddress' inputProps={{ placeholder: "", rows: "9" }} />
        </section>
        </div>
        <section className='form-button'>
        <Button
          label={"Simpan"}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </section>
      </form>
  )
}