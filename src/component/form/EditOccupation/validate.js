import validateInput from '../../../utils/validateInput';

export default function validate(values) {
  const { 
    occupation,
    officeName,
    jobTitle,
    officeAddress,
  } = values;

  return {
    occupation:  validateInput(occupation, ['required']),
    officeName: occupation === 'Pensiun' || occupation === 'Tidak Bekerja'? validateInput(officeName, []) : validateInput(officeName, ['required']),
    jobTitle: occupation === 'Pensiun' || occupation === 'Tidak Bekerja'? validateInput(jobTitle, []) : validateInput(jobTitle, ['required']),
    officeAddress: occupation === 'Pensiun' || occupation === 'Tidak Bekerja'? validateInput(officeAddress, []) : validateInput(officeAddress, ['required']),
  };
}