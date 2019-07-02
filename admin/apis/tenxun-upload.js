import axios from 'axios';

export const upload = ({ signature, url, formData }) => {
  const headers = {
    Authorization: signature
  };
  let params = {
    url,
    method: 'post',
    data: formData,
    headers
  };
  return axios(params)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw error;
    });
};
