import React, { useState, useEffect } from "react";
import "./style.css";
import LoginForm from "../../component/form/LoginForm";
import * as image from "../../utils/Images";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./action";
import { ToastContainer } from "react-toastify";
import { registerTime } from "../../utils/format";

export default function Login() {
  const dispatch = useDispatch();
  const { isLoading, message } = useSelector((s) => s.login);
  const [disabled, setDisabled] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => {
      clearTimeout(timer);
    };
  });

  const calculateTimeLeft = () => {
    //let year = new Date().getFullYear();
    let difference = +`${Number(registerTime)}` - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Menit: Math.floor((difference / 1000 / 60) % 60),
        Detik: Math.floor((difference / 1000) % 60) || 0,
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (Object.keys(timeLeft).length <= 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [timeLeft]);

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
           { !disabled ? <p>
              Silakan lakukan pendaftaran akun dengan menekan tombol Sign Up
              dibawah ini
            </p> : 
            <section className='DPT-close'>
            <p>Pendaftaran DPT Telah Berakhir</p>
            <p>Terima kasih atas partisipasi anda dalam MUNAS VI IKATA 2021</p>
            <p>Berjumpa kembali di MUNAS IKATA selanjutnya</p>
            </section>
            }
          </div>
          { !disabled && <div className='register-now-button'>
            <Link disabled={disabled} to='/sign-up'>Sign Up</Link>
          </div> }
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
