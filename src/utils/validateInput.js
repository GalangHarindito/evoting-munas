//import { fileAccept } from './format';

const regexEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
const regexUserName = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const regexDate = /^((0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-[12]\d{3})$/;
const regexPhone = /^\+\d{1,14}$/

export default function validateInput(value, rules) {
  //console.log(value.size)
  if (rules.find(i => i === 'required' && noValue(value)))
  {return 'Harus diisi';}
  if (rules.find(i => i === 'valid-number' && isNaN(Number(value))))
  {return 'Data harus berisi angka';}
  if (rules.find(i => i === 'valid-email' && !regexEmail.test(value)))
  {return 'Format email salah';}
  if (rules.find(i => i === 'valid-phone' && !regexPhone.test(value)))
  {return 'Masukkan kode negara exp:+62';}
  if (rules.find(i => i === 'valid-user' && !regexUserName.test(value)))
  {return 'Pastikan gunakan username yang sesuai saat registrasi';}
  if (rules.find(i => i === 'valid-password' && !regexPassword.test(value)))
  {return 'Password harus memiliki minimal 8 karakter dan harus berisi huruf kapital serta angka';}
  if (rules.find(i => i.includes('min-length') && value.length < Number(i.replace(/[^0-9,]+/g, ''))))
  {return `Karakter harus lebih dari ${Number(rules.find(i => i.includes('min-length')).replace(/[^0-9,]+/g, ''))}`;}
  if (rules.find(i => i.includes('max-length') && value.length > Number(i.replace(/[^0-9,]+/g, ''))))
  {return `Karakter jangan lebih dari ${Number(rules.find(i => i.includes('max-length')).replace(/[^0-9,]+/g, ''))}`;}
  if (rules.find(i => i.includes('min-value') && value < Number(i.replace(/[^0-9,]+/g, ''))))
  {return `Nilai minimal adalah ${Number(rules.find(i => i.includes('min-value')).replace(/[^0-9,]+/g, ''))}`;}
  if (rules.find(i => i.includes('max-value') && value > Number(i.replace(/[^0-9,]+/g, ''))))
  {return `Nilai maksimal adalah ${Number(rules.find(i => i.includes('max-value')).replace(/[^0-9,]+/g, ''))}`;}
  if (rules.find(i => i.includes('min-size') && (value / 1024) < Number(i.replace(/[^0-9,]+/g, ''))))
  {return `Ukuran minimal adalah ${Number(rules.find(i => i.includes('min-size')).replace(/[^0-9,]+/g, ''))} KB`;}
  if (rules.find(i => i.includes('max-size') && (value / 1024) > Number(i.replace(/[^0-9,]+/g, ''))))
  {return `Ukuran maksimal adalah ${Number(rules.find(i => i.includes('max-size')).replace(/[^0-9,]+/g, ''))} KB`;}
  //if (rules.find(i => i.includes('file-accept') && !matchVal(i, value[0].type)))
  //{return `Type File hanya ${getRules(rules.find(i => i.includes('file-accept')))}`;}
  return '';
}

//export function getRules(val) {
//  const matches = val.match(/\((.*?)\)/);
//  const fileaccept = fileAccept(matches[1].split(','));
//  return fileaccept;
//}

export function matchVal(str, val) {
  const matches = str.match(/\((.*?)\)/);

  if (matches) {
    const arrayVal = matches[1].split(',');
    return (
      arrayVal.includes(val)
    );
  } else {
    return false;
  }
}

export function noValue(val) {
  if (typeof val === 'object' || Array.isArray(val)) {
    return val && !val.length;
  } else {
    return !val;
  }
}

export function dateVal(value) {
  return regexDate.test(value);
}
