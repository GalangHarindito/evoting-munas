import React from "react";
import "./style.css";
import ForgotForm from "../../component/form/ForgotPassword";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { forgotAction } from './action';
import { ToastContainer } from "react-toastify";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const { isLoading, message } = useSelector(s => s.forgotPassword)

  return (
    <section className='forgot-password'>
      <section className='forgot-password-content'>
        <div className='forgot-group-1'>
          <h4>Lupa Password?</h4>
        <p>
          Silakan masukan alamat Email anda. Kami akan mengirimkan password baru
          melalui Email
        </p>
        </div>
        <div>
          <ForgotForm onSubmit={(values) =>  dispatch(forgotAction(values))} isLoading={isLoading} />
        </div>
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
