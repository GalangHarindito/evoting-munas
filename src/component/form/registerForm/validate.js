import validateInput from '../../../utils/validateInput';

export default function validate(values) {
  const { 
    fullName,
    email,
    angkatan,
    nationality,
    identityNumber, 
    gender,
    placeOfBirth,
    dateOfBirth,
    countryCode,
    phoneNumber
  } = values;

  return {
    fullName: validateInput(fullName, ['required']),
    email: validateInput(email, ['required', 'valid-email']),
    angkatan: validateInput(angkatan, ['required']),
    nationality: validateInput(nationality, ['required']),
    identityNumber: validateInput(identityNumber, ['required', 'valid-number']),
    gender: validateInput(gender, ['required']),
    placeOfBirth: validateInput(placeOfBirth, ['required']),
    dateOfBirth: validateInput(dateOfBirth, ['required']),
    countryCode: validateInput(countryCode, ['required']),
    phoneNumber: validateInput(phoneNumber, ['required','valid-number', 'valid-phone'])
  };
}
