import { FAILED, LOADING, SUCCESS, DATA } from './constants';

const initialState = {
  isLoading: false,
  message: [],
  messageSuccess: '',
  dataButtonDisabled: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, message, messageSuccess, data, key } = action;

  switch (type) {
    case FAILED:
      return {
        ...state,
        message,
      };
    case SUCCESS:
      return {
        ...state,
        messageSuccess,
      };
    case DATA:
      return {
        ...state,
        [`data${key}`]: data,
      };
    case LOADING:
      return {
        ...state,
        isLoading,
      };
    default:
      return state;
  }
}