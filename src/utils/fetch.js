import axios from 'axios';

//export const BASIC_URL = 'https://ikata.semoga.online/api/'

export const BASIC_URL = (mode => {
  console.log(mode)
  if (mode === 'production') {
    return 'https://ikata.semoga.online/api/';
  }
  if (mode === 'staging') {
    return 'https://stage-ikata.semoga.online/api/';
  }
  return 'https://stage-ikata.semoga.online/api/';
})(process.env.MODE);


const fetch = (url, method, paramBody, paramHeader) => {
  const options = {
    method: method,
    url: url,
    data: paramBody,
    headers: {
    }
  };

  return new Promise((resolve, reject) => {
    axios(options)
      .then((res) => resolve(res.data))
      .catch(err => {
        const defaultError = {
          code: 500,
          status: 'error',
          message: 'Failed to fetch data. Please contact developer.'
        };
        if (!err.response) reject(defaultError);
        else reject(err.response.data);
      });
  });
};

export const loginUser = async (data) => {
  await fetch(`${BASIC_URL}account/login`,'POST', data, '')
}