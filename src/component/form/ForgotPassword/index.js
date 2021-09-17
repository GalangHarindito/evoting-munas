import { reduxForm } from 'redux-form';
import Component from './ForgotForm';
import validate from './validate';

const initialValues = {
  email: '',
};

export default reduxForm({
  form: 'forgotForm',
  initialValues,
  validate,
})(Component);
