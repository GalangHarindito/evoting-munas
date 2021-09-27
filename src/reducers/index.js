import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import login from '../pages/Login/reducer';
import register from '../pages/Register/reducer';
import forgotPassword from '../pages/ForgotPassword/reducer';
import dashboard from '../pages/Dashboard/reducer';
import profile from '../pages/Profile/reducer';
import header from '../component/elements/headers/reducer';
import editProfile from '../pages/EditProfile/reducer';
import evoting from '../pages/Evoting/reducer';
import dpt from '../pages/DPT/reducer';

const rootReducer = combineReducers({
  login,
  register,
  forgotPassword,
  dashboard,
  profile,
  header,
  editProfile,
  evoting,
  dpt,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
