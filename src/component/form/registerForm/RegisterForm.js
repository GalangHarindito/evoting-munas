import React, {useState} from "react";
import { Field } from "redux-form";
import "./style.css";
import Button from "../../elements/button/Button";
import Text from "../../field/text/Text";
import Select from "../../field/select/Select";
import RadioGroup from "../../field/radioGroup/RadioGroup";
import ModalInfo from "../../elements/ModalInfo";
import { angkatanKuliah } from "../../../utils/format";

export default function RegisterForm(props) {
  const {
    handleSubmit,
    optionGender,
    isLoading,
  } = props;
  const [disabled, setDisabled] = useState(true);
  const [openResponse, setOpenResponse] = useState(false);
  const closeModal = () => setOpenResponse(false);
  const handleDisabled = () => {
    return setDisabled(!disabled)
  }
  return (
    <form className='registerForm' onSubmit={handleSubmit} >
      <section>
        <Field component={Text} label='Nama Lengkap' name='fullName' />
      </section>

      <label className='label-phone'>Nomer Handphone (WhatsApp aktif)</label>
      <section>
        <Field component={Text} label='' name='phoneNumber' />
      </section>
        
  
      <section>
        <Field component={Text} label='Email' name='email' />
      </section>
      <section>
        <Field component={Text} label='Nomer Induk Mahasiswa (Opsional)' name='nim' />
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
      <section className='checkbox-syarat'>
          
         <input type="checkbox" onChange={handleDisabled} style={{margin: 'auto'}} /> 
         <label >Saya menyutujui, <span style={{marginBottom:'0rem', fontSize:'0.8rem', cursor:'pointer', fontWeight:'500', color:'black', justifySelf :'center', textDecoration:'underline'}} onClick={() => setOpenResponse(true)}>Kebijakan Privasi</span></label>
        </section>
      <section className='form-button'>
       
        
        <Button
          label={"Sign Up"}
          disabled={disabled}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </section>
      <ModalInfo
        message= {[
          <b>KEBIJAKAN PRIVASI</b>, 
          '1. Biodata Pribadi digunakan sebagai syarat ketentuan terdaftar sebagai pemilih tetap. Proses pemilihan dilaksanakan melalui tahap cek pemilih oleh Panitia. Tidak sembarang orang selain anggota IKATA dapat melakukan pemilihan.', 
          '2. Dokumentasi KTP/Foto digunakan dalam berbagai macam proses verifikasi yang dilakukan didalam sistem agar membuktikan bahwa pemilih benar adanya.',
          '3. Informasi kontak digunakan dalam proses verifikasi dan pemberitahuan terkait sistem, seperti pemberitahuan terdaftar DPT akan dikirimkan ke kontak.',
          '',
          <b>Informasi yang bersifat Publik</b>,
          '1. Informasi yang di collect hanya akan untuk mendukung layanan dalam kebutuhan Pemilihan Ketua IKATA.',
          '2. Dokumentasi KTP/Foto hanya digunakan pada proses verifikasi secara manual'
        ]}
        onClose={closeModal}
        open={openResponse} 
        />
    </form>
  );
}
