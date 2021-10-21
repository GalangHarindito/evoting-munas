import { reduxForm } from "redux-form";
import Component from "./CalonKetua";
import validate from './validate';

const initialValues = {
  number: '',
  fullName: '',
  phoneNumber: '',
  nim: '',
  angkatan: '',
  gender: '',
  photo: '',
  jargon: '',
  visi: '',
  misi: '',
  linkVideo: '',
  occupation: '',
  jobTitle: '',
  officeName: '',
  officeAddress: '',
  address: '',
  kabupatenId: '',
  kecamatanId: '',
  kodePos: '',
  propinsiId: '',
  identityNumber:'',
  email:'',
  linkedin:'',
  facebook:'',
  instagram:''
};

export default reduxForm({
  form: "calonKetuaForm",
  initialValues,
  validate
})(Component);
