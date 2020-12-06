// Reducer file for Headmaster

import { FETCH_HEADMASTER_SCHOOL } from '../actions/actionTypes';

const initialState = {};
// Fetch school data for headmaster
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HEADMASTER_SCHOOL:
      return state;
    default:
      return state;
  }
};
