// Reducer file for Login

import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from '../actions/actionTypes';

const initialState = {
  loggedIn: false,
  userId: '',
  role: '',
};

//! Temporarily decoding JWT here on behalf of the backend. Lets us work with mock-backend and test out private routing.
//!This should be done server-side.
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

const loginReducer = (state = initialState, action) => {
  // console.log("loginReducer --> action.payload:", action.payload);

  switch (action.type) {
    case AUTH_SUCCESS:
      let decoded = parseJwt(String(action.payload));
      return {
        ...state,
        loggedIn: true,
        userId: decoded.id,
        role: decoded.role,
      };
    case AUTH_LOGOUT:
      return { ...state, initialState };
    default:
      return state;
  }
};

export default loginReducer;
