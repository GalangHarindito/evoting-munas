import validateInput from '../../../utils/validateInput';

export default function validate(values) {
  const { 
    fullName,
    phoneNumber,
    angkatan,
    gender,
    email,
    visi,
    misi,
    jargon
  } = values;

  return {
    fullName: validateInput(fullName, ['required']),
    email: validateInput(email, ['required', 'valid-email']),
    angkatan: validateInput(angkatan, ['required']),
    gender: validateInput(gender, ['required']),
    phoneNumber: validateInput(phoneNumber, ['required','valid-number', 'valid-phone']),
    visi: validateInput(visi, ['required']),
    misi: validateInput(misi, ['required']),
    jargon: validateInput(jargon, ['required']),
  };

 
}