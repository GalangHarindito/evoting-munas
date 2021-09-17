import { FAILED, LOADING, LASTPAGE, SUCCESS } from './constants';
import axios from 'axios';
import { getToken } from '../../utils/storage';
import { toast } from 'react-toastify';

const BASIC_URL = 'http://ikata.semoga.online/api/'

export function getProfile() {
  
  return dispatch => {
    dispatch(loadingAction(true));

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
        dispatch(loadingAction(false));
        if ( status === 200 ) {
          dispatch(successAction(data, 'Profile'));
        } else {
          dispatch(failedAction('You are not allowed to access'));
        }
      })
      .catch(err => {
        const { status, message } = err.response.data
        if(status === 401){
          window.location.href = '/login'
        }
        const messageStatus = status > 401 && status <= 500 ? 'Sedang ada malah, silahkan refresh halaman' : message;
        toasterError(messageStatus)
        dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false));
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