import { FAILED, LOADING, LASTPAGE, SUCCESS } from './constants';

const initialState = {
  isLoading: false,
  message:'',
  dataProfile:{},
  dataBiodata:{},
  dataAddress:{},
  dataOccupancy:{},
  datahasVerifiedProfile:'',
  datahasVotedProfile:''
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, message, key, data, lastPage } = action;

  switch (type) {
    case FAILED:
      return {
        ...state,
        message,
      };
    case LOADING:
      return {
        ...state,
        [`isLoading${key}`]: isLoading,
      };
    case LASTPAGE:
      return {
        ...state,
        lastPage
      };
    case SUCCESS:
      return {
        ...state,
        [`data${key}`]: data,
      };
    default:
      return state;
  }
}