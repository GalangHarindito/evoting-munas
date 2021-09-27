import validateInput from '../../../utils/validateInput';

export default function validate(values) {
  const { 
    address,
    kabupatenId,
    kodePos,
    kecamatanId,
    propinsiId
  } = values;

  return {
    address: validateInput( address, ['required']),
    kabupatenId: validateInput(kabupatenId, ['required']),
    kodePos: validateInput(kodePos, ['required']),
    kecamatanId: validateInput(kecamatanId, ['required']),
    propinsiId: validateInput(propinsiId, ['required']),
  };
}