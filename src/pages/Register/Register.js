import React, { useState, useEffect } from "react";
import "./style.css";
import RegisterForm from "../../component/form/registerForm";
import * as image from "../../utils/Images";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { capitalizedArray } from "../../utils/format";
import { register, resetMessage, resetMessageSuccess } from "./actions";
import { ToastContainer } from "react-toastify";
import ModalResponse from "../../component/elements/ModalResponse";
import caraDaftar from "../../assets/cara-daftar-dpt.pdf";
import { useHistory, useLocation } from "react-router-dom";
import CaraMendaftar from "../../component/fragment/CaraMendaftar/CaraMendaftar";
import { registerTime } from "../../utils/format";
import { disabledButton } from './actions';

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const { isLoading, message, messageSuccess } = useSelector((s) => s.register);
  const [openResponse, setOpenResponse] = useState(false);
  const closeModal = () => setOpenResponse(false);
  const [disabled, setDisabled] = useState(false);

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
      dispatch(disabledButton(disabled))
    } else {
      setDisabled(false);
      dispatch(disabledButton(disabled))
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!openResponse) {
      if (messageSuccess === 200) {
      }
      dispatch(resetMessage());
    }
  }, [openResponse]);

  useEffect(() => {
    messageSuccess ? setOpenResponse(true) : closeModal();
  }, [messageSuccess]);

  useEffect(() => {
    dispatch(resetMessageSuccess());
  }, []);

  const optionGender = [
    { label: "Laki-laki", value: "Male" },
    { label: "Perempuan", value: "Female" },
  ];

  if (search === "?embed=caradaftar") {
    return <CaraMendaftar data={caraDaftar} />;
  }
  return (
    <section className='wrapper-register'>
      <section
        className='login-now'
        style={{
          backgroundImage: `url(${image.imgMaskLogin})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <section className='login-now-content'>
          <div className='login-now-header'>
            <h4>Sudah Memiliki Akun DPT?</h4>
            <p>
              Silakan klik tombol Login di bawah ini untuk masuk ke halaman
              E-Voting
            </p>
          </div>
          <div className='login-now-button'>
            <Link to='/login'>LOGIN</Link>
          </div>
        </section>
      </section>
      {!disabled ? (
        <section className='register-content'>
          <h4 className='register-text'>
            Buat Akun Baru{" "}
            <span>
              <small
                style={{
                  cursor: "pointer",
                  fontSize: "0.865rem",
                  textDecoration: "underline",
                }}
                onClick={() => history.push(`?embed=caradaftar`)}
              >
                Cara Mendaftar
              </small>
            </span>
          </h4>
          <RegisterForm
            onSubmit={(values) => {
              //const phone = `${values.countryCode}${inputPhone(values.phoneNumber)}`

              const newData = {};
              newData["fullName"] = capitalizedArray(values.fullName);
              newData["email"] = values.email;
              newData["angkatan"] = Number(values.angkatan);
              newData["phoneNumber"] = values.phoneNumber;
              newData["gender"] = values.gender;
              newData["nim"] = values.nim;
              dispatch(register(newData));
            }}
            optionGender={optionGender}
            isLoading={isLoading}
            message={message}
          />
        </section>
      ) : (
        <RegisterOver />
      )}

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
        error={messageSuccess === 200 ? true : false}
        message={[
          <b>Pendaftaran Berhasil</b>,
          "Password akun dikirim ke email anda",
          "Apabila Email Password belum diterima, gunakan lupa password dihalaman Login untuk mengirim ulang",
        ]}
        onClose={closeModal}
        open={openResponse}
        labelLink='Login'
        toLink='/login'
      />
    </section>
  );
}

function RegisterOver() {
  return (
    <section className='register-over'>
      <div>
        <h4>Waktu Pendaftaran DPT Telah Berakhir</h4>
        <p>Terima kasih atas partisipasi anda dalam MUNAS VI IKATA 2021</p>
        <p>Berjumpa kembali di MUNAS IKATA selanjutnya</p>
      </div>
    </section>
  );
}
