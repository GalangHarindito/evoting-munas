import validateInput from '../../../utils/validateInput';

export default function validate(values) {
  const { email, password } = values;

  return {
    email: validateInput(email, ['required']),
    password: validateInput(password, ['required']),
  };
}
