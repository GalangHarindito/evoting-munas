import React, {useEffect} from 'react';
import './style.css';
import { Field } from 'redux-form';
import Text from '../../field/text/Text';
import Select from '../../field/select/Select';
import Button from '../../elements/button/Button';
import TextArea from '../../field/textArea/TextArea';
import { useSelector } from 'react-redux';

export default function EditAddress(props) {
  const { 'editAddressForm':dataForm } = useSelector(s => s.form);
  const { values } = dataForm;
  const {
    data, 
    dataPropinsi,
    dataKabupaten,
    dataKecamatan,
    fetch1,
    fetch2,
    initialize,
    handleSubmit,
    isLoading,
  } = props;

  useEffect(() => {
    const { address, kabupatenId, kecamatanId, kodePos, propinsiId } = data;
    initialize({...values, 
      address:address,
      kabupatenId:kabupatenId,
      kecamatanId:kecamatanId,
      kodePos:kodePos,
      propinsiId:propinsiId,
    });
  },[data])
  return(
      <form className='editAddressForm' onSubmit={handleSubmit}>
        <div>
           <section>
          <Field component={TextArea} label='Alamat' name='address' inputProps={{ placeholder: "", rows: "13" }} />
        </section>
        <div className='form-select'>
           <section>
          <Field component={Select} label='Provinsi' name='propinsiId' inputProps={{ placeholder: "" }} options={dataPropinsi} onChange={event => fetch1(event.target.value)} />
        </section>
        <section>
          <Field component={Select} label='Kabupaten/Kota' name='kabupatenId' inputProps={{ placeholder: "" }} options={dataKabupaten } onChange={event => fetch2(event.target.value)} />
        </section>
        <section>
          <Field component={Select} label='Kecamatan' name='kecamatanId' inputProps={{ placeholder: "" }} options={dataKecamatan } />
        </section>
        <section>
          <Field component={Text} label='Kode Pos' name='kodePos' />
        </section>
        </div>
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