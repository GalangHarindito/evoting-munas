import { FAILED, LOADING, SUCCESS } from './constants';
import axios from 'axios';
import { getToken } from '../../utils/storage';
import { toast } from 'react-toastify';
import queryString from 'querystring';
import { clearStorages } from '../../utils/storage';

const BASIC_URL = 'https://ikata.semoga.online/api/';

export function getAllDPT(payload) {
  return dispatch => {
    dispatch(loadingAction(true,''));
      const newQuery = queryString.stringify(payload);
      const req = newQuery ? `?${decodeURIComponent(newQuery)}` : '';
      const options = {
        method: 'GET',
        url: `${BASIC_URL}dpt${req}`,
        headers: {  
          Authorization : getToken()
        }
      };
     
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
        const { status, data, meta } = res.data;

        dispatch(loadingAction(false,''));
        if ( status === 200 ) {
          dispatch(successAction(data, ''));
          dispatch(successAction(meta, 'MetaDpt'));
        } else {
          dispatch(failedAction('You are not allowed to access'));
        }
      })
      .catch(err => {
        const { status, message } = err.response.data
        if(status === 401){
          clearStorages();
          window.location.href = '/login'
        }
        if(status === 403){
          clearStorages();
          window.location.href = '/login'
        }
        const messageStatus = status > 403 && status <= 500 ? 'Sedang ada masalah, silahkan refresh halaman' : message;
        toasterError(messageStatus)
        dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false,''));
      });

}
}

export function fetchDeleteDpt(id, name) {
  
  return dispatch => {
    dispatch(loadingAction(true, 'Delete'));

      const options = {
        method: 'DELETE',
        url: `${BASIC_URL}dpt/${id}`,
        headers: {  
          Authorization : getToken()
        }
      };
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
  
      axios(options)
      .then((res) => {
        const { status } = res.data;
        //const { hasVerified, hasVoted, biodata, address, occupancy } = data;

        dispatch(loadingAction(false, 'Delete'));
        if ( status === 200 ) {
          dispatch(successAction('Berhasil Hapus DPT', 'MesDelete'));
          toasterSuccess(`Berhasil DELETE DPT ${name}`)
        } else {
          dispatch(failedAction('You are not allowed to access'));
        }
      })
      .catch(err => {
        const { status, message } = err.response.data
        if(status === 401){
          window.location.href = '/login'
        }
        if(status === 403){
          clearStorages();
          window.location.href = '/login'
        }
        const messageStatus = status > 403 && status <= 500 ? 'Sedang ada masalah, silahkan refresh halaman' : message;
        toasterError(messageStatus)
        dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false, 'Delete'));
      });

}
}

export function fetchUpdateVerified(id, name) {
  
  return dispatch => {
    dispatch(loadingAction(true, 'Verified'));
    dispatch(failedAction('', 'Verified'));

      const options = {
        method: 'GET',
        url: `${BASIC_URL}verification/${id}/approve`,
        headers: {  
          Authorization : getToken()
        }
      };
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
  
      axios(options)
      .then((res) => {
        const { status } = res.data;
        //const { hasVerified, hasVoted, biodata, address, occupancy } = data;

        dispatch(loadingAction(false, 'Verified'));
        if ( status === 200 ) {
          dispatch(successAction('Berhasil Verifikasi DPT', 'MesVerified'));
          toasterSuccess(`Berhasil VERIFIKASI DPT ${name}`)
        } else {
          dispatch(failedAction('You are not allowed to access'));
        }
      })
      .catch(err => {
        const { status, message } = err.response.data
        if(status === 401){
          window.location.href = '/login'
        }
        if(status === 403){
          clearStorages();
          window.location.href = '/login'
        }
        const messageStatus = status > 403 && status <= 500 ? 'Sedang ada masalah, silahkan refresh halaman' : message;
        toasterError(messageStatus)
        dispatch(failedAction(messageStatus, 'Verified'));
        dispatch(loadingAction(false, 'Verified'));
      });

}
}

export function register(data) {
  return dispatch => {
    dispatch(loadingAction(true, 'Register'));
    dispatch(failedAction(''))

      const options = {
        method: 'POST',
        url: `${BASIC_URL}account/registration`,
        data: data,
        headers: {  
        }
      };
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
  
      axios(options)
      .then((res) => {
        const { status } = res
     
        dispatch(loadingAction(false, 'Register'));
        if ( status === 200 ) {
          dispatch(successAction('Pendaftaran DPT Berhasil', 'MesRegister'));
          toasterSuccess('Pendaftaran DPT Berhasil')
        } else {
          dispatch(failedAction('You are not allowed to access'));
        }
      })
      .catch(err => {
        const { status, message } = err.response.data
        const messageStatus = status >= 400 && status < 500 ? err.message[0].msg : message;
        for(let i in messageStatus){
          toasterError(messageStatus[i].msg)
        }
        dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false, 'Register'));
      });

}
}



export function resetMessage() {
  return failedAction('');
}

function failedAction(message, key) {
  return { type: FAILED, message, key };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}

function successAction(data, key) {
  return { type: SUCCESS, data, key };
}

