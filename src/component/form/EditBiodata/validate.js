import validateInput from '../../../utils/validateInput';

export default function validate(values) {
  const { 
    fullName,
    angkatan,
    nim,
  } = values;

  return {
    fullName: validateInput(fullName, ['required']),
    angkatan: validateInput(angkatan, ['required']),
    nim: validateInput( nim, ['required']),
  };

 
}