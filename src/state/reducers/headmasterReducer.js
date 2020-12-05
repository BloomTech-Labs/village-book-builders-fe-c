// Reducer file for Headmaster

import { FETCH_HEADMASTER_SCHOOL } from '../actions/index';

const initialState = {};
// Fetch school data for headmaster
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HEADMASTER_SCHOOL:
      return state;
    default:
      return state;
  }
}
