import axios from 'axios';

export const axiosWithAuth = () => {
  // console.log('axios with auth ran here');
  const token = window.localStorage.getItem('token');

  // console.log("AxiosAuth --> baseURL:", process.env.REACT_APP_BASEURL);
  // console.log("AxiosAuth --> token:", token);

  return axios.create({
    baseURL: 'https://vbb-mock-api.herokuapp.com',
    headers: {
      Authorization: token,
    },
  });
};
