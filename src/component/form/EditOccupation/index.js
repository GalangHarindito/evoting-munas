import { reduxForm } from 'redux-form';
import Component from './EditOccupation';
import validate from './validate';

const initialValues = {
  occupation: '',
  officeName: '',
  jobTitle : '',
  officeAddress: '',
};

export default reduxForm({
  form: 'editOccupationForm',
  initialValues,
  validate
})(Component);