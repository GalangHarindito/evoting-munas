import validateInput from '../../../utils/validateInput';

export default function validate(values) {
  const { 
    fullName,
    angkatan,
  } = values;

  return {
    fullName: validateInput(fullName, ['required']),
    angkatan: validateInput(angkatan, ['required']),
  };

 
}