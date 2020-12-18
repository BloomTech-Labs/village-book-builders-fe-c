// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file
import axios from 'axios';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
// import env from 'react-dotenv';

import * as actionTypes from './actionTypes';
import { useHistory } from 'react-router-dom';
// import { react } from 'plotly.js';

const baseURL = process.env.REACT_APP_BASEURL;
// const baseURL = 'https://cors-anywhere.herokuapp.com/http://54.158.134.245/api'; // ! Temporary backend URL -- waiting on Stakeholder's backend to work
// const baseURL = 'https://vbb-backend-team-a.herokuapp.com';

export const login = data => dispatch => {
  // const { push } = useHistory();
  axios
    .post(`${baseURL}/auth/login`, data)
    .then(res => {
      // console.log('LOGIN ACTION SUCCESS --> ', res.data);
      window.localStorage.setItem('token', res.data.access_token);
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        payload: res.data.access_token,
      });
      // window.location.replace('/dashboard/');
      // push('/dashboard');
    })
    .catch(err => {
      console.log('LOGIN ACTION FAILURE--> with this data:', data);
      console.dir(err);
    });
};

export const fetchHeadmasterSchool = () => dispatch => {
  dispatch({ type: actionTypes.FETCH_HEADMASTER_SCHOOL });
};

//!Make sure that the actual server sends village data back that's related to the headmaster's id
export const fetchVillage = id => dispatch => {
  // console.log("ACTIONSindexFetchVillage --> test", process.env.REACT_APP_BASEURL)
  axiosWithAuth()
    // .get(`${baseURL}/headmaster/village/${id}`)
    .get(`/village/${id}`)
    .then(res => {
      // console.log('IndexActionFetchVillage -> res:', res);
      dispatch({ type: actionTypes.FETCH_VILLAGE, payload: res.data });
    })
    .catch(err => console.dir(err));
};

//! this one hasn't been checked yet for functionality
export const editVillage = (id, data) => () => {
  axiosWithAuth()
    .put(`/village/${id}`, data)
    .then(() => {
      window.location.replace('/school-village/');
    })
    .catch(err => console.dir(err));
};

export const fetchSchools = () => dispatch => {
  axiosWithAuth()
    .get(`/school`)
    .then(res => {
      // console.log("FETCH SCHOOLS:", res.data);
      dispatch({
        type: actionTypes.FETCH_HEADMASTER_SCHOOLS,
        payload: res.data,
      });
    })
    .catch(err => {
      // console.log("FETCHSCHOOLS Failed")
      console.dir(err);
    });
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
