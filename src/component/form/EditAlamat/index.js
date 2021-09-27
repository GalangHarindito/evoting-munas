import { reduxForm } from 'redux-form';
import Component from './EditAddress';
import validate from './validate';

const initialValues = {
  address: '',
  kabupatenId: '',
  kodePos : '',
  kecamatanId: '',
  propinsiId : ''
};

export default reduxForm({
  form: 'editAddressForm',
  initialValues,
  validate
})(Component);