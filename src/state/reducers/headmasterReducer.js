// Reducer file for Headmaster

import {
  FETCH_HEADMASTER_SCHOOLS,
  FETCH_VILLAGE,
  FETCH_HEADMASTER_PROFILE,
} from '../actions/actionTypes';

const initialState = {
  villageData: {
    education_contact: {
      name: '',
    },
  },
  schoolData: [],
  headmasterProfile: '',
};
// Fetch school data for headmaster
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HEADMASTER_SCHOOLS:
      return { ...state, schoolData: action.payload };
    case FETCH_HEADMASTER_PROFILE:
      return { ...state, headmasterProfile: action.payload };
    case FETCH_VILLAGE:
      return {
        ...state,
        villageData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
