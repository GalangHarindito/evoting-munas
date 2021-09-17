import validateInput from '../../../utils/validateInput';

export default function validate(values) {
  const { email } = values;

  return {
    email: validateInput(email, ['required', 'valid-email']),
  };
}