import { FAILED, LOADING, SUCCESS, DATA } from "./constants";
import axios from "axios";
import { toast } from "react-toastify";
import { BASIC_URL } from "../../utils/fetch";

export function register(data) {
  return (dispatch) => {
    dispatch(loadingAction(true));
    dispatch(successMessageAction(""));
    dispatch(failedAction(""));

    const options = {
      method: "POST",
      url: `${BASIC_URL}account/registration`,
      data: data,
      headers: {},
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
    };

    axios(options)
      .then((res) => {
        const { status } = res;

        dispatch(loadingAction(false));
        if (status === 200) {
          dispatch(successMessageAction(status));
        } else {
          dispatch(failedAction("You are not allowed to access"));
        }
      })
      .catch((err) => {
        const { status, message } = err.response.data;
        const messageStatus =
          status >= 400 && status < 500 ? err.message[0].msg : message;
        for (let i in messageStatus) {
          toasterError(messageStatus[i].msg);
        }
        dispatch(failedAction(messageStatus));

        dispatch(loadingAction(false));
      });
  };
}

export function disabledButton(disabled) {
  return (dispatch) => {
    dispatch(successAction(disabled, "ButtonDisabled"));
  };
}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}

function failedAction(message) {
  return { type: FAILED, message };
}

function successMessageAction(messageSuccess) {
  return { type: SUCCESS, messageSuccess };
}

export function resetMessage() {
  return failedAction("");
}

export function resetMessageSuccess() {
  return successMessageAction("");
}

function successAction(data, key) {
  return { type: SUCCESS, data, key };
}
