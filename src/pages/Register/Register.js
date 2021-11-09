import React, { useState, useEffect } from "react";
import "./style.css";
import RegisterForm from "../../component/form/registerForm";
import * as image from "../../utils/Images";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { capitalizedArray } from "../../utils/format";
import { register, resetMessage, resetMessageSuccess } from "./actions";
import { ToastContainer } from "react-toastify";
import ModalResponse from "../../component/elements/ModalResponse";
import caraDaftar from "../../assets/cara-daftar-dpt.pdf";
import { useHistory, useLocation } from "react-router-dom";
import CaraMendaftar from "../../component/fragment/CaraMendaftar/CaraMendaftar";

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const { isLoading, message, messageSuccess} = useSelector(s => s.register)
  const [openResponse, setOpenResponse] = useState(false);
  const closeModal = () => setOpenResponse(false);

  useEffect(() => {
    if (!openResponse) {
      if (messageSuccess === 200) {
      }
      dispatch(resetMessage());
    }
  }, [openResponse]);

  useEffect(() => {
    (messageSuccess) ? setOpenResponse(true):closeModal();
  }, [messageSuccess]);

  useEffect(() => {
    dispatch(resetMessageSuccess())
  },[])

  const optionGender = [
    { label: 'Laki-laki', value: 'Male'},
    { label: 'Perempuan', value: 'Female'},
  ]

  if(search === '?embed=caradaftar'){
    return  <CaraMendaftar data={caraDaftar} />
  }
  return (
    <section className='wrapper-register'>
       <section
        className='login-now'
        style={{
          backgroundImage: `url(${image.imgMaskLogin})`,
          backgroundRepeat: "no-repeat",
          backgroundSize:'cover'
        }}
      >
        <section className='login-now-content'>
          <div className='login-now-header'>
            
            <h4>Sudah Memiliki Akun DPT?</h4>
            <p>
            Silakan klik tombol Login di bawah ini untuk masuk ke halaman E-Voting
            </p>
          </div>
          <div className='login-now-button'>
           <Link to='/login'>LOGIN</Link>
          </div>
        </section>
      </section>
      <section className='register-content'>
        <h4 className='register-text'>Buat Akun Baru  <span><small style={{cursor:'pointer', fontSize:'0.865rem', textDecoration:'underline'}} onClick={() => history.push(`?embed=caradaftar`)}>Cara Mendaftar</small></span></h4>
       

          <RegisterForm 
            onSubmit={(values) => {
              //const phone = `${values.countryCode}${inputPhone(values.phoneNumber)}`

              const newData = {}
              newData['fullName']= capitalizedArray(values.fullName)
              newData['email']= values.email
              newData['angkatan']= Number(values.angkatan)
              newData['phoneNumber']= values.phoneNumber
              newData['gender']= values.gender
              newData['nim']= values.nim
              dispatch(register(newData))
            }} 
            optionGender={optionGender}
            isLoading={isLoading}
            message={message}
          />
      </section>
      {message && (
        <ToastContainer
          position='top-center'
          //autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}
        <ModalResponse
        error={messageSuccess === 200? true : false}
        message= {[
          <b>Pendaftaran Berhasil</b>, 
          'Password akun dikirim ke email anda', 
          'Apabila password belum diterima, gunakan lupa password dihalaman Login untuk mengirim ulang'
        ]}
        onClose={closeModal}
        open={openResponse} 
        labelLink='Login' 
        toLink='/login' />
    </section>
  );
}