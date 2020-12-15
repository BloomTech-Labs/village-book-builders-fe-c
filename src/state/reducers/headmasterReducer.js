// Reducer file for Headmaster

import {
  FETCH_HEADMASTER_SCHOOLS,
  FETCH_VILLAGE,
} from '../actions/actionTypes';

const initialState = {
  villageData: {
    education_contact: {
      name: '',
    },
  },
  schoolData: [],
};
// Fetch school data for headmaster
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HEADMASTER_SCHOOLS:
      return { ...state, schoolData: action.payload };
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
