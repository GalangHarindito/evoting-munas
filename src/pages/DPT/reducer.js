import { FAILED, LOADING, SUCCESS } from './constants';

const initialState = {
  isLoading: false,
  isLoadingDelete:false,
  isLoadingVerified:false,
  isLoadingRegister:false,
  message:'',
  messageVerified:'',
  data:[],
  dataMetaDpt:{},
  dataMesDelete:'',
  dataMesVerified:'',
  dataMesRegister:'',
  dataMesUnVerified:''
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, message, key, data } = action;

  switch (type) {
    case FAILED:
      return {
        ...state,
        [`message${key}`]: message,
      };
    case LOADING:
      return {
        ...state,
        [`isLoading${key}`]: isLoading,
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