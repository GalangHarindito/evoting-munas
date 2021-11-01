import React from "react";
import "./style.css";
import LoginForm from "../../component/form/LoginForm";
import * as image from "../../utils/Images";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./action";
import { ToastContainer } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const { isLoading, message } = useSelector((s) => s.login);


  return (
    <section className='wrapper-login'>
      <section className='login-content'>
        <h4 className='login-text'>Selamat Datang</h4>
        <p>Silahkan login menggunakan akun anda</p>
        <LoginForm
          onSubmit={(values) => dispatch(login(values))}
          isLoading={isLoading}
          message={message}
        />
      </section>
      <section
        className='register-now'
        style={{
          backgroundImage: `url(${image.imgMaskLogin})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <section className='register-now-content'>
          <div className='register-now-header'>
            <h4>Belum Memiliki Akun DPT?</h4>
            <p>
              Silakan lakukan pendaftaran akun dengan menekan tombol Sign Up
              dibawah ini
            </p>
          </div>
          <div className='register-now-button'>
            <Link to='/sign-up'>Sign Up</Link>
          </div>
          <br />
        </section>
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
    </section>
  );
}
