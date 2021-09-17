import { FAILED, LOADING, SUCCESS } from './constants';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASIC_URL = 'http://ikata.semoga.online/api/'

export function register(data) {
  return dispatch => {
    dispatch(loadingAction(true));

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
  
      axios(options)
      .then((res) => {
        const { status } = res
     
        dispatch(loadingAction(false));
        if ( status === 200 ) {
          dispatch(successMessageAction(status));
        } else {
          dispatch(failedAction('You are not allowed to access'));
        }
      })
      .catch(err => {
        console.log(err.response.data)
        const { status, message } = err.response.data
        const messageStatus = status >= 400 && status < 500 ? err.message[0].msg : message;
        for(let i in messageStatus){
          toasterError(messageStatus[i].msg)
        }
        dispatch(failedAction(messageStatus));
        
        dispatch(loadingAction(false));
      });

}
}

//export function phoneCode() {
//  return dispatch => {

//      const options = {
//        method: 'GET',
//        url: `https://restcountries.eu/rest/v2/all`,
//        headers: {  
//        }
//      };
  
//      axios(options)
//      .then((res) => {
//        const { data, status } = res
     
//        if ( status === 200 ) {
//          dispatch(dataAction(data, 'Phone'));
//        } else {
//          dispatch(failedAction('You are not allowed to access'));
//        }
//      })
//      //.catch(err => {
//      //  console.log(err.response.data)
//      //  const { status, message } = err.response.data
//      //  const messageStatus = status >= 400 && status < 500 ? err.message[0].msg : message;
//      //  for(let i in messageStatus){
//      //    toasterError(messageStatus[i].msg)
//      //  }
//      //  dispatch(failedAction(messageStatus));
        
//      //  dispatch(loadingAction(false));
//      //});

//}
//}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}

//function dataAction(data, key) {
//  return { type: DATA, data, key };
//}

function failedAction(message) {
  return { type: FAILED, message };
}

function successMessageAction(messageSuccess) {
  return { type: SUCCESS, messageSuccess };
}

export function resetMessage() {
  return failedAction('');
}