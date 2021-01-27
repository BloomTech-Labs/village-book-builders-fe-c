// Reducer file for Mentee

import {
  FETCH_MENTEE_PROFILE_START,
  FETCH_MENTEE_PROFILE_SUCCESS,
  FETCH_MENTEE_PROFILE_FAILURE,
  EDIT_MENTEE_PROFILE_START,
  EDIT_MENTEE_PROFILE_SUCCESS,
  EDIT_MENTEE_PROFILE_FAILURE,
} from '../actions/actionTypes';

import { debugLog } from '../../utils/debugMode.js';

const initialState = {
  menteeProfile: '',
  isLoading: true,
};

// Fetch mentee data
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MENTEE_PROFILE_START:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: true };
    case FETCH_MENTEE_PROFILE_SUCCESS:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false, menteeProfile: action.payload };
    case FETCH_MENTEE_PROFILE_FAILURE:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false };
    case EDIT_MENTEE_PROFILE_START:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: true };
    case EDIT_MENTEE_PROFILE_SUCCESS:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false, menteeProfile: action.payload };
    case EDIT_MENTEE_PROFILE_FAILURE:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
