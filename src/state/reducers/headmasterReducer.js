// Reducer file for Headmaster

import {
  FETCH_HEADMASTER_SCHOOLS,
  FETCH_VILLAGE,
  FETCH_HEADMASTER_PROFILE,
  FETCH_MENTEE_SUCCESS,
  FETCH_MENTEE_FAILURE,
  FETCH_MENTEE_START,
} from '../actions/actionTypes';

const initialState = {
  villageData: {},
  schoolData: [],
  headmasterProfile: '',
  mentees: [],
};
// Fetch school data for headmaster
const reducer = (state = initialState, action) => {
  // console.log('HEADMASTERREDUCER.js, action type & payload:', action.type, action.payload);
  switch (action.type) {
    case FETCH_HEADMASTER_SCHOOLS:
      console.log(action.type);
      return { ...state, schoolData: action.payload };
    case FETCH_HEADMASTER_PROFILE:
      console.log(action.type);
      return { ...state, headmasterProfile: action.payload };
    case FETCH_VILLAGE:
      console.log(action.type);
      return {
        ...state,
        villageData: action.payload,
      };
    case FETCH_MENTEE_SUCCESS:
      console.log(action.type);
      return {
        ...state,
        mentees: action.payload,
      };
    case FETCH_MENTEE_START:
      console.log(action.type);
      return { ...state };
    case FETCH_MENTEE_FAILURE:
      console.log(action.type);
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
