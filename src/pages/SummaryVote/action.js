import { FAILED, LOADING, LASTPAGE, SUCCESS } from "./constants";
import axios from "axios";
import { toast } from "react-toastify";
import { clearStorages } from "../../utils/storage";
import { BASIC_URL } from "../../utils/fetch";

export function fetchResultVote() {
  return (dispatch) => {
    dispatch(loadingAction(true, "ResultCandidate"));

    const options = {
      method: "GET",
      url: `${BASIC_URL}vote`,
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
        const { status, data } = res.data;
        dispatch(loadingAction(false, "ResultCandidate"));
        if (status === 200) {
          dispatch(successAction(data, "Result"));
        } else {
          dispatch(failedAction("You are not allowed to access"));
        }
      })
      .catch((err) => {
        const { status, message } = err.response.data;
        if (status === 401) {
          clearStorages();
          window.location.href = "/login";
        }
        const messageStatus =
          status > 401 && status <= 500
            ? "Sedang ada masalah, silahkan refresh halaman"
            : message;
        toasterError(messageStatus);
        dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false, "ResultCandidate"));
      });
  };
}

export function changeLastPage(value) {
  return lastPageAction(value);
}

export function resetMessage() {
  return failedAction("");
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
