import validateInput from '../../../utils/validateInput';

export default function validate(values) {
  const { 
    fullName,
    email,
    angkatan,
    nim, 
    gender,
    phoneNumber
  } = values;

  return {
    fullName: validateInput(fullName, ['required']),
    email: validateInput(email, ['required', 'valid-email']),
    angkatan: validateInput(angkatan, ['required']),
    gender: validateInput(gender, ['required']),
    nim: validateInput(nim, ['required', 'valid-number']),
    phoneNumber: validateInput(phoneNumber, ['required','valid-number', 'valid-phone'])
  };
}
