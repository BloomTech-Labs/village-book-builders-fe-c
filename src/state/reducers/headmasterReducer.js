// Reducer file for Headmaster

import {
  FETCH_HEADMASTER_SCHOOLS,
  FETCH_VILLAGE,
} from '../actions/actionTypes';

const initialState = {
  villageData: {},
  schoolData: [],
};
// Fetch school data for headmaster
const reducer = (state = initialState, action) => {
  // console.log('HEADMASTERREDUCER.js, action type & payload:', action.type, action.payload);
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
