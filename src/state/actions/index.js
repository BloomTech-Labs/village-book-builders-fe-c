// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file
import axios from 'axios';

import * as actionTypes from './actionTypes';

const baseURL = 'http://54.158.134.245/api'; // ! Temporary backend URL -- waiting on Stakeholder's backend to work

export const login = data => dispatch => {
  axios
    .post(`${baseURL}/login`)
    .then(res => {
      console.log('LOGIN ACTION --> ', res);
      window.location.replace('/dashboard/');
    })
    .catch(err => console.dir(err));
};

export const fetchHeadmasterSchool = () => dispatch => {
  dispatch({ type: actionTypes.FETCH_HEADMASTER_SCHOOL });
};

export const fetchVillage = id => dispatch => {
  axios // ! This needs to change to axiosWithAuth once we figure out GoogleAuth with a working backend
    .get(`${baseURL}/headmaster/village/${id}`)
    .then(res => {
      dispatch({ type: actionTypes.FETCH_VILLAGE, payload: res.data });
    })
    .catch(err => console.dir(err));
};

export const editVillage = (id, data) => () => {
  axios // ! This needs to change to axiosWithAuth once we figure out GoogleAuth with a working backend
    .put(`${baseURL}/headmaster/village/${id}`, data)
    .then(() => {
      window.location.replace('/school-village/');
    })
    .catch(err => console.dir(err));
};

export const fetchSchools = () => dispatch => {
  axios
    .get(`${baseURL}/headmaster/schools`)
    .then(res => {
      dispatch({
        type: actionTypes.FETCH_HEADMASTER_SCHOOLS,
        payload: res.data,
      });
    })
    .catch(err => console.dir(err));
};

export const fetchSchool = id => dispatch => {
  axios
    .get(`${baseURL}/headmaster/schools/${id}`)
    .then(res => console.log(res.data))
    .catch(err => console.dir(err));
};

export const editSchool = (id, data) => dispatch => {
  axios
    .put(`${baseURL}/headmaster/schools/${id}`, data)
    .then(res => {
      window.location.replace('/school-village/');
    })
    .catch(err => console.dir(err));
};
//TODO Finish converting this to redux
// export const fetchLibraries = () => dispatch => {
//   axios // ! This needs to change to axiosWithAuth once we figure out GoogleAuth with a working backend
//     .get(`${baseURL}/api/admin/library`)
//     .then(res => {
//       // dispatch({ type: actionTypes.FETCH_VILLAGE, payload: res.data });
//     })
//     .catch(err => console.dir(err));
// };

export const editLibrary = (id, data) => dispatch => {
  axios // ! This needs to change to axiosWithAuth once we figure out GoogleAuth with a working backend
    .put(`${baseURL}/admin/library/${id}`, data)
    .then(() => {
      window.location.replace('/admin/libraries');
    })
    .catch(err => console.dir(err));
};
