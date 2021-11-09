import { FAILED, LOADING, SUCCESS } from './constants';
import axios from 'axios';
import { getToken } from '../../utils/storage';
import { toast } from 'react-toastify';
import { clearStorages } from '../../utils/storage';
import { BASIC_URL } from '../../utils/fetch';

export function getCheckVote(payload) {
  return dispatch => {
    dispatch(loadingAction(true, ''));

      const options = {
        method: 'POST',
        url: `${BASIC_URL}vote/check`,
        data: payload,
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

        dispatch(loadingAction(false, ''));
        if ( status === 200 ) {
          dispatch(successAction(data, ''));
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
        dispatch(loadingAction(false, ''));
      });

}
}


export function resetMessage(data, key) {
  return successAction(data, key);
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

