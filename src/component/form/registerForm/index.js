import { reduxForm } from 'redux-form';
import Component from './RegisterForm';
import validate from './validate';

const initialValues = {
  fullName: '',
  email: '',
  angkatan : '',
  nim : '',
  phoneNumber : '',
  gender : '',
};

export default reduxForm({
  form: 'registerForm',
  initialValues,
  validate,
})(Component);