import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "./action";
import { ToastContainer } from "react-toastify";

export default function Dashboard() {
  const dispatch = useDispatch()
  const { message } = useSelector(s => s.dashboard);

  useEffect(() => {
    dispatch(getProfile())
  },[])


  return(
    <section>
      <h2>Tata Cara Pemilihan</h2>
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
  )
}