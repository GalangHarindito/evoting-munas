import { FAILED, LOADING, LASTPAGE, SUCCESS } from './constants';
import axios from 'axios';
import { getToken } from '../../../utils/storage';
import { toast } from 'react-toastify';
import { clearStorages } from '../../../utils/storage';
import { BASIC_URL } from '../../../utils/fetch';

export function fetchAllEventsCategory() {
  
  return dispatch => {
    dispatch(loadingAction(true, 'EventCategory'));

      const options = {
        method: 'GET',
        url: `${BASIC_URL}event-category?isActive=true`,
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

        dispatch(loadingAction(true, 'EventCategory'));
        if ( status === 200 ) {
          dispatch(successAction(data, 'Category'));
   
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
        dispatch(loadingAction(true, 'EventCategory'));
      });

}
}

export function fetchPostEventsCategory(payload) {
  
  return dispatch => {
    dispatch(loadingAction(true, 'PostCategory'));
    dispatch(successAction('', 'MesPostCategory'));

      const options = {
        method: 'POST',
        url: `${BASIC_URL}event-category`,
        data: payload,
        headers: {  
          Authorization : getToken()
        }
      };
      const toasterSuccess = (text) => {
        toast.success(`${text}`, {
          position: 'top-center',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
        const { status } = res.data;
        //const { hasVerified, hasVoted, biodata, address, occupancy } = data;

        dispatch(loadingAction(false, 'PostCategory'));
        if ( status === 200 ) {
          dispatch(successAction('Berhasil', 'MesPostCategory'));
          toasterSuccess('Berhasil Menambah Data Event Category');
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
        dispatch(loadingAction(false, 'PostCategory'));
      });

}
}

export function fetchDeleteEventsCategory(id) {
  
  return dispatch => {
    dispatch(loadingAction(true, 'DeleteCategory'));
    dispatch(successAction('', 'MesDeleteCategory'));

      const options = {
        method: 'DELETE',
        url: `${BASIC_URL}event-category/${id}`,
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
        const { status } = res.data;
        //const { hasVerified, hasVoted, biodata, address, occupancy } = data;

        dispatch(loadingAction(false, 'DeleteCategory'));
        if ( status === 200 ) {
          dispatch(successAction('Berhasil', 'MesDeleteCategory'));
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
        dispatch(loadingAction(false, 'DeleteCategory'));
      });

}
}

export function fetchAllEvents() {
  
  return dispatch => {
    dispatch(loadingAction(true, 'Event'));

      const options = {
        method: 'GET',
        url: `${BASIC_URL}event`,
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

        dispatch(loadingAction(true, 'Event'));
        if ( status === 200 ) {
          dispatch(successAction(data, 'Events'));
   
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
        dispatch(loadingAction(true, 'Event'));
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