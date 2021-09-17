import { FAILED, LOADING, LASTPAGE, SUCCESS } from './constants';



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

function plantingAction(data, key) {
  return { type: PLANTING, data, key };
}

function lastPageAction(lastPage) {
  return { type: LASTPAGE, lastPage };
}
