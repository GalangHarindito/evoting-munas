import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import login from '../pages/Login/reducer';
import register from '../pages/Register/reducer';
import forgotPassword from '../pages/ForgotPassword/reducer';
import dashboard from '../pages/Dashboard/reducer';
import profile from '../pages/Profile/reducer';

const rootReducer = combineReducers({
  login,
  register,
  forgotPassword,
  dashboard,
  profile,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
