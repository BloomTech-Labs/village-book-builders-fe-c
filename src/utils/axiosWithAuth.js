import axios from 'axios';

export const axiosWithAuth = () => {
  const token = window.localStorage.getItem('token');
  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

  return axios.create({
    baseURL,
    headers: {
      Authorization: token,
    },
  });
};
