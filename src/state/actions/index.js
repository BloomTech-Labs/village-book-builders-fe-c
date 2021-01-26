// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file
import axios from 'axios';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

import * as actionTypes from './actionTypes';
const baseURL = process.env.REACT_APP_BASE_URL;

export const checkToken = data => dispatch => {
  dispatch({
    type: actionTypes.AUTH_SUCCESS,
    payload: window.localStorage.getItem('token'),
  });
};

// -------------------------
// AUTHORIZATION
// -------------------------
export const login = data => dispatch => {
  axios
    // will need to update this to baseURL, there seems to be a link issue with the .env file
    .post('https://vbb-mock-api.herokuapp.com/auth/login', data)
    .then(res => {
      // console.log('LOGIN ACTION SUCCESS --> token', res.data);
      window.localStorage.setItem('token', res.data.access_token);
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        payload: res.data.access_token,
      });
    })
    .catch(err => {
      console.log(
        'LOGIN ACTION FAILURE--> with this data & baseURL:',
        data,
        baseURL
      );
      console.dir(err);
    });
};

export const logout = () => dispatch => {
  dispatch({ type: actionTypes.AUTH_LOGOUT });
  window.localStorage.removeItem('token');
};

// -----------------------
// HEADMASTER
// -----------------------

export const editHeadmasterProfile = (id, data) => dispatch => {
  axiosWithAuth()
    .put(`/headmaster/${id}`, data)
    .then(res => {
      // ? refactor all the window.location.replace's so this doesn't force a refresh. see how login does it for example.
      window.location.replace('/profile/');
    })
    .catch(err => console.dir(err));
};
export const fetchHeadmasterProfile = id => dispatch => {
  axiosWithAuth()
    .get(`/headmaster/${id}`) // change this later
    .then(res => {
      console.log('fetchHeadmasterProfile action --> ', res.data);
      dispatch({
        type: actionTypes.FETCH_HEADMASTER_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => console.dir(err));
};

export const fetchHeadmasterSchool = () => dispatch => {
  dispatch({ type: actionTypes.FETCH_HEADMASTER_SCHOOL });
};

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

export const editVillage = (id, data) => () => {
  axiosWithAuth()
    .put(`/village/${id}`, data)
    .then(() => {
      window.location.replace('/school-village/');
    })
    .catch(err => console.dir(err));
};

// ----------------
// MENTEE
// ----------------

export const fetchMentees = () => dispatch => {
  dispatch({ type: actionTypes.FETCH_MENTEE_START });
  axiosWithAuth()
    .get(`/mentee`)
    .then(res => {
      dispatch({ type: actionTypes.FETCH_MENTEE_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({ type: actionTypes.FETCH_MENTEE_FAILURE, payload: err })
    );
};

export const editMenteeProfile = (id, data) => dispatch => {
  axiosWithAuth()
    .put(`/mentee/${id}`, data)
    .then(res => {
      // ? refactor all the window.location.replace's so this doesn't force a refresh. see how login does it for example.
      window.location.replace('/profile/');
    })
    .catch(err => console.dir(err));
};

export const fetchMenteeProfile = id => dispatch => {
  axiosWithAuth()
    .get(`/mentee/${id}`)
    .then(res => {
      console.log('fetchMenteeProfile action --> ', res.data);
      dispatch({
        type: actionTypes.FETCH_MENTEE_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => console.dir(err));
};

export const fetchMenteesBySearch = search => dispatch => {
  dispatch({ type: actionTypes.FETCH_MENTEE_BY_LAST_NAME_START });
  axiosWithAuth()
    .get(`/mentee?last_name=${search}`)
    .then(res => {
      console.log('inside the action', res.data);
      dispatch({
        type: actionTypes.FETCH_MENTEE_BY_LAST_NAME_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({
        type: actionTypes.FETCH_MENTEE_BY_LAST_NAME_FAILURE,
        payload: err,
      })
    );
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
  axiosWithAuth()
    .get(`/school/${id}`)
    .then(res => {
      // console.log(res.data);
    })
    .catch(err => console.dir(err));
};

export const editSchool = (id, data) => dispatch => {
  axiosWithAuth()
    .put(`/school/${id}`, data)
    .then(res => {
      window.location.replace('/school-village/');
    })
    .catch(err => console.dir(err));
};

export const fetchMentors = () => dispatch => {
  dispatch({ type: actionTypes.FETCH_MENTOR_START });
  axiosWithAuth()
    .get(`https://vbb-mock-api.herokuapp.com/mentor`)
    .then(res => {
      dispatch({ type: actionTypes.FETCH_MENTOR_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({ type: actionTypes.FETCH_MENTOR_FAILURE, payload: err })
    );
};

// ----------------
// ADMIN
// ----------------

export const editLibrary = (id, data) => dispatch => {
  axiosWithAuth()
    .put(`/library/${id}`, data)
    .then(() => {
      window.location.replace('/admin/libraries');
    })
    .catch(err => console.dir(err));
};

export const addLibrary = (id, data) => dispatch => {
  axiosWithAuth()
    .post(`/library`, data)
    .then(() => {
      window.location.replace('/admin/libraries');
    })
    .catch(err => console.dir(err));
};

// -----------------------
// TEACHER
// -----------------------

export const editTeacherProfile = (id, data) => dispatch => {
  axiosWithAuth()
    .put(`/teacher/${id}`, data)
    .then(res => {
      // ? refactor all the window.location.replaces so this doesn't force a refresh. see how login does it for example.
      window.location.replace('/profile/');
    })
    .catch(err => console.dir(err));
};
export const fetchTeacherProfile = id => dispatch => {
  axiosWithAuth()
    .get(`/teacher/${id}`) // change this later
    .then(res => {
      console.log('fetchTeacherProfile action --> ', res.data);
      dispatch({
        type: actionTypes.FETCH_TEACHER_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => console.dir(err));
};

// -----------------------
// PROGRAM
// -----------------------

export const editProgramProfile = (id, data) => dispatch => {
  axiosWithAuth()
    .put(`/program/${id}`, data)
    .then(res => {
      // ? refactor all the window.location.replaces so this doesn't force a refresh. see how login does it for example.
      window.location.replace('/profile/');
    })
    .catch(err => console.dir(err));
};
export const fetchProgramProfile = id => dispatch => {
  axiosWithAuth()
    .get(`/program/${id}`) // change this later
    .then(res => {
      console.log('fetchProgramProfile action --> ', res.data);
      dispatch({
        type: actionTypes.FETCH_PROGRAM_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => console.dir(err));
};
