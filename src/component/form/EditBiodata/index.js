import { reduxForm } from 'redux-form';
import Component from './EditBiodata';
import validate from './validate';

const initialValues = {
  fullName: '',
  email: '',
  angkatan : '',
  nim : '',
  phoneNumber : '',
  photo:''
};

export default reduxForm({
  form: 'editBiodataForm',
  initialValues,
  validate
})(Component);
