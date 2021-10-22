import { FAILED, LOADING } from './constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASIC_URL } from '../../utils/fetch';

export function forgotAction(data) {
  return dispatch => {
    dispatch(loadingAction(true));
   
      const options = {
        method: 'POST',
        url: `${BASIC_URL}account/forgot-password`,
        data: data,
        headers: {
        }
      };

      const toasterSuccess = (text) => {
        toast.success(`${text}`, {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }

      const toasterError = (text) => {
        toast.error(`${text}`, {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
  
      axios(options)
      .then((res) => {
        const { data } = res
        dispatch(loadingAction(false));
        if (data.status === 200) {
          toasterSuccess('Password berhasil dikirim ke email anda')
        } else {
          dispatch(loginFailedAction('You are not allowed to access'));
        }
      })
      .catch(err => {
        const { status, message } = err.response.data
        const messageStatus = status >= 400 && status < 500 ? [{msg : 'Email atau Password anda salah!'}] : message;
        dispatch(loginFailedAction(messageStatus));
        toasterError(messageStatus)
        dispatch(loadingAction(false));
      });

}
}


function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}

function loginFailedAction(message) {
  return { type: FAILED, message };
}
