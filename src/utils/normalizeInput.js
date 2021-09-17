//import { thousand } from './format';
import { toTitleCase } from './text';

const regexAlphabet = /[^a-zA-Z ]+/g;
const regexAlphanumeric = /[^a-zA-Z0-9 ]+/g;
const regexNumber = /[^0-9,]+/g;

export const alphabet = (value) => (
  value && value.replace(regexAlphabet, '')
);

export const alphanumeric = (value) => (
  value && value.replace(regexAlphanumeric, '')
);

export const number = (value) => (
  value && value.replace(regexNumber, '')
);

export const titleCase = (type) => (value) => {
  if (type === 'alphabet') {
    return value && toTitleCase(value.replace(regexAlphabet, ''));
  } else if (type === 'alphanumeric') {
    return value && toTitleCase(value.replace(regexAlphanumeric, ''));
  } else {
    return value && toTitleCase(value);
  }
};

//export const thousandSeparator = (value) => {
//  return value && thousand(value.replace(/[^0-9]+/g, ''));
//};
