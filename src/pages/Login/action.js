import { setToken, setUserData } from '../../utils/storage';
import { FAILED, LOADING } from './constants';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASIC_URL = 'http://ikata.semoga.online/api/'

export function login(data) {
  return dispatch => {
    dispatch(loadingAction(true));
   
      const options = {
        method: 'POST',
        url: `${BASIC_URL}account/login`,
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
  
      axios(options)
      .then((res) => {
        const { status, data } = res
        dispatch(loadingAction(false));
        if (status === 200) {
          const { accessToken } = data;
          setToken(accessToken);
          setUserData(data.data);
          dispatch(loginFailedAction(''));
          window.location.href = '/';
        } else {
          dispatch(loginFailedAction('You are not allowed to access'));
        }
      })
      .catch(err => {
        const messageStatus = err.response.status >= 400 ? 'Email atau Password anda salah!' : '';
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