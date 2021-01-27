// Reducer file for Mentee

import { FETCH_MENTEE_PROFILE } from '../actions/actionTypes';

import { debugLog } from '../../utils/debugMode.js';

const initialState = {
  menteeProfile: '',
};

// Fetch mentee data
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MENTEE_PROFILE:
      debugLog(action.type, action.payload);
      return { ...state, menteeProfile: action.payload };
    default:
      return state;
  }
};

export default reducer;
