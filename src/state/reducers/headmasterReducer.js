// Reducer file for Headmaster

import { FETCH_HEADMASTER_SCHOOL, FETCH_VILLAGE } from '../actions/actionTypes';

const initialState = {};
// Fetch school data for headmaster
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HEADMASTER_SCHOOL:
      return state;
    case FETCH_VILLAGE:
      return state;
    default:
      return state;
  }
};

export default reducer;
