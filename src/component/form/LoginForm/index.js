import { reduxForm } from 'redux-form';
import Component from './LoginForm';
import validate from './validate';

const initialValues = {
  email: '',
  password: ''
};

export default reduxForm({
  form: 'loginForm',
  initialValues,
  validate,
})(Component);
