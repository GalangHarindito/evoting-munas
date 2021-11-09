import { FAILED, LOADING, LASTPAGE, SUCCESS } from './constants';
import axios from 'axios';
import { getToken } from '../../../utils/storage';
import { toast } from 'react-toastify';
import { clearStorages } from '../../../utils/storage';
import { BASIC_URL } from '../../../utils/fetch';

export function fetchCandidateId(id) {
  
  return dispatch => {
    dispatch(loadingAction(true));

      const options = {
        method: 'GET',
        url: `${BASIC_URL}candidate/${id}`,
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
        const { status, data } = res.data;
        //const { hasVerified, hasVoted, biodata, address, occupancy } = data;
        dispatch(loadingAction(false));
        if ( status === 200 ) {
          const { address } = data;
         
          dispatch(successAction(data, 'Candidate'));
          dispatch(successAction(address, 'AddressCandidate'));
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
        dispatch(loadingAction(false));
      });
}

}

export function fetchEditCandidate(id,payload) {
  
  return dispatch => {
    dispatch(loadingAction(true, 'EditKetua'));
    dispatch(failedAction(''));
    dispatch(successAction('', 'EditCandidate'));

      const options = {
        method: 'PUT',
        url: `${BASIC_URL}candidate/${id}`,
        data: payload,
        headers: {  
          Authorization : getToken()
        }
      };
      options.headers['Content-Type'] = 'multipart/form-data; boundary=something'
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
        const messageSuccess = 'Data Calon Ketua Ikata Berhasil Diubah';
        const { status } = res.data;
        dispatch(loadingAction(false, 'EditKetua'));
        if ( status === 200 ) {
          dispatch(successAction(messageSuccess, 'EditCandidate'));
          toasterSuccess(messageSuccess)
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
        const messageStatus = status > 403 && status <= 500 ?  message : 'Sedang ada masalah, silahkan coba kembali' ;
        toasterError(messageStatus)
        dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false, 'EditKetua'));
      });

}
}

export function fetchPostCandidate(payload) {
  
  return dispatch => {
    dispatch(loadingAction(true, 'postKetua'));
    dispatch(failedAction(''));
    dispatch(successAction('', 'PostCandidate'));

      const options = {
        method: 'POST',
        url: `${BASIC_URL}candidate`,
        data: payload,
        headers: {  
          Authorization : getToken()
        }
      };
      options.headers['Content-Type'] = 'multipart/form-data; boundary=something'
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
        const messageSuccess = 'Data Calon Ketua Ikata Berhasil Disimpan';
        const { status } = res.data;
        dispatch(loadingAction(false, 'postKetua'));
        if ( status === 200 ) {
          dispatch(successAction(messageSuccess, 'PostCandidate'));
          toasterSuccess(messageSuccess)
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
        const messageStatus = status > 403 && status <= 500 ?  message : 'Sedang ada masalah, silahkan coba kembali' ;
        toasterError(messageStatus)
        dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false, 'postKetua'));
      });

}
}

export function fetchPropinsi() {
  
  return dispatch => {
    dispatch(failedAction(''));

      const options = {
        method: 'GET',
        url: `${BASIC_URL}administration/propinsi`,
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
        const { status, data } = res.data;
        if ( status === 200 ) {
          dispatch(successAction(data, 'Propinsi'));
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
        const messageStatus = status > 403 && status <= 500 ?  message : 'Sedang ada masalah, silahkan coba kembali' ;
        toasterError(messageStatus)
        dispatch(failedAction(messageStatus));
      });

}
}

export function fetchKabupaten(payload) {
  
  return dispatch => {
    dispatch(failedAction(''));

      const options = {
        method: 'GET',
        url: `${BASIC_URL}administration/kabupaten/${payload}`,
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
        const { status, data } = res.data;
        if ( status === 200 ) {
          dispatch(successAction(data, 'Kabupaten'));
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
        const messageStatus = status > 403 && status <= 500 ?  message : 'Sedang ada masalah, silahkan coba kembali' ;
        toasterError(messageStatus)
        dispatch(failedAction(messageStatus));
      });

}
}

export function fetchKecamatan(payload) {
  
  return dispatch => {
    dispatch(failedAction(''));

      const options = {
        method: 'GET',
        url: `${BASIC_URL}administration/kecamatan/${payload}`,
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
        const { status, data } = res.data;
        if ( status === 200 ) {
          dispatch(successAction(data, 'Kecamatan'));
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
        const messageStatus = status > 403 && status <= 500 ?  message : 'Sedang ada masalah, silahkan coba kembali' ;
        toasterError(messageStatus)
        dispatch(failedAction(messageStatus));
      });

}
}

export function changeLastPage(value) {
  return lastPageAction(value);
}

export function resetMessage() {
  return failedAction('');
}

function failedAction(message) {
  return { type: FAILED, message };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}

function successAction(data, key) {
  return { type: SUCCESS, data, key };
}

function lastPageAction(lastPage) {
  return { type: LASTPAGE, lastPage };
}