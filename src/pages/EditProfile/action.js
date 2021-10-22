import { FAILED, LOADING, LASTPAGE, SUCCESS } from './constants';
import axios from 'axios';
import { getToken } from '../../utils/storage';
import { toast } from 'react-toastify';
import { clearStorages } from '../../utils/storage';
import { BASIC_URL } from '../../utils/fetch';

export function getProfile() {
  
  return dispatch => {
    dispatch(loadingAction(true));
    dispatch(failedAction(''));

      const options = {
        method: 'GET',
        url: `${BASIC_URL}account/profile`,
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
        const { hasVerified, hasVoted, biodata, address, occupancy, account } = data;

        dispatch(loadingAction(false));
        if ( status === 200 ) {
          dispatch(successAction(data, 'Profile'));
          dispatch(successAction(account, 'Account'));
          dispatch(successAction(biodata, 'Biodata'));
          dispatch(successAction(address, 'Address'));
          dispatch(successAction(occupancy, 'Occupation'));
          dispatch(successAction(hasVerified, 'hasVerifiedProfile'));
          dispatch(successAction(hasVoted, 'hasVotedProfile'));
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
        const messageStatus = status > 403 && status <= 500 ?  message : 'Sedang ada masalah, silahkan coba kembali' ;
        toasterError(messageStatus)
        dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false));
      });

}
}

export function fetchUpdateBiodata(payload) {
  
  return dispatch => {
    dispatch(loadingAction(true, 'Biodata'));
    dispatch(failedAction(''));

      const options = {
        method: 'PUT',
        url: `${BASIC_URL}dpt/biodata`,
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
        const messageSuccess = 'Data Biodata Berhasil Disimpan';
        const { status, message } = res.data;
        dispatch(loadingAction(false, 'Biodata'));
        if ( status === 200 ) {
          dispatch(failedAction(message));
          toasterSuccess(messageSuccess)
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
        const messageStatus = status > 403 && status <= 500 ?  message : 'Sedang ada masalah, silahkan coba kembali' ;
        toasterError(messageStatus)
        dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false, 'Biodata'));
      });

}
}

export function fetchUpdateAddress(payload) {
  
  return dispatch => {
    dispatch(loadingAction(true, 'Address'));
    dispatch(failedAction(''));

      const options = {
        method: 'PUT',
        url: `${BASIC_URL}dpt/alamat`,
        data: payload,
        headers: {  
          Authorization : getToken()
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
        const messageSuccess = 'Data Alamat Berhasil Disimpan';
        const { status, message } = res.data;
        dispatch(loadingAction(false, 'Address'));
        if ( status === 200 ) {
          dispatch(failedAction(message));
          toasterSuccess(messageSuccess)
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
        const messageStatus = status > 403 && status <= 500 ?  message : 'Sedang ada masalah, silahkan coba kembali' ;
        toasterError(messageStatus)
        dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false, 'Address'));
      });

}
}

export function fetchUpdateOccupation(payload) {
  
  return dispatch => {
    dispatch(loadingAction(true, 'Occupation'));
    dispatch(failedAction(''));

      const options = {
        method: 'PUT',
        url: `${BASIC_URL}dpt/pekerjaan`,
        data: payload,
        headers: {  
          Authorization : getToken()
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
        const messageSuccess = 'Data Pekerjaan Berhasil Disimpan';
        const { status, message } = res.data;
        dispatch(loadingAction(false, 'Occupation'));
        if ( status === 200 ) {
          dispatch(failedAction(message));
          toasterSuccess(messageSuccess)
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
        const messageStatus = status > 403 && status <= 500 ?  message : 'Sedang ada masalah, silahkan coba kembali' ;
        toasterError(messageStatus)
        dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false, 'Occupation'));
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
          clearStorages();
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
          clearStorages();
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
          clearStorages();
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
