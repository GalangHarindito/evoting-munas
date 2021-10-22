import { FAILED, LOADING, LASTPAGE, SUCCESS } from './constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import { clearStorages } from '../../utils/storage';
import { BASIC_URL } from '../../utils/fetch'; 

export function fetchSummaryAll() {
  
  return dispatch => {
    dispatch(loadingAction(true, 'All'));

      const options = {
        method: 'GET',
        url: `${BASIC_URL}summary`,
        headers: {}
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
        dispatch(loadingAction(false, 'All'));
        if ( status === 200 ) {
          dispatch(successAction(data, 'All'));
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
        const messageStatus = status > 401 && status <= 500 ? 'Sedang ada masalah, silahkan refresh halaman' : message;
        toasterError(messageStatus)
        dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false, 'All'));
      });
}

}

export function fetchSummaryAngkatan() {
  
  return dispatch => {
    dispatch(loadingAction(true, 'Angkatan'));

      const options = {
        method: 'GET',
        url: `${BASIC_URL}summary/angkatan`,
        headers: {}
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
        dispatch(loadingAction(false, 'Angkatan'));
        if ( status === 200 ) {
          dispatch(successAction(data, 'Angkatan'));
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
        const messageStatus = status > 401 && status <= 500 ? 'Sedang ada masalah, silahkan refresh halaman' : message;
        toasterError(messageStatus)
        dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false, 'Angkatan'));
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