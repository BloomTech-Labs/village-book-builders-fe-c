// Reducer file for Mentee

import {
  FETCH_MENTEE_PROFILE_START,
  FETCH_MENTEE_PROFILE_SUCCESS,
  FETCH_MENTEE_PROFILE_FAILURE,
  EDIT_MENTEE_PROFILE_START,
  EDIT_MENTEE_PROFILE_SUCCESS,
  EDIT_MENTEE_PROFILE_FAILURE,
  FETCH_MENTEE_BY_DOB_START,
  FETCH_MENTEE_BY_DOB_SUCCESS,
  FETCH_MENTEE_BY_DOB_FAILURE,
  FETCH_MENTEE_BY_LAST_NAME_START,
  FETCH_MENTEE_BY_LAST_NAME_SUCCESS,
  FETCH_MENTEE_BY_LAST_NAME_FAILURE,
} from '../actions/actionTypes';

import { debugLog } from '../../utils/debugMode.js';

const initialState = {
  menteeProfile: '',
  isLoading: true,
  searchedMentee: [],
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
    case FETCH_MENTEE_BY_DOB_START:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: true };
    case FETCH_MENTEE_BY_DOB_SUCCESS:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false, searchedMentee: action.payload };
    case FETCH_MENTEE_BY_DOB_FAILURE:
      debugLog(action.type, action.payload);
      return {
        ...state,
        searchedMentee: 'No Mentee Found with this DOB',
        isLoading: false,
      };
    case FETCH_MENTEE_BY_LAST_NAME_START:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: true };
    case FETCH_MENTEE_BY_LAST_NAME_SUCCESS:
      debugLog(action.type, action.payload);
      return { ...state, searchedMentee: action.payload, isLoading: false };
    case FETCH_MENTEE_BY_LAST_NAME_FAILURE:
      debugLog(action.type, action.payload);
      return {
        ...state,
        searchedMentee: 'No Mentee found with this Last name',
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
