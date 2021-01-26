// Reducer file for Headmaster & Mentee

import {
  FETCH_HEADMASTER_SCHOOLS,
  FETCH_VILLAGE,
  FETCH_HEADMASTER_PROFILE,
  FETCH_MENTEE_SUCCESS,
  FETCH_MENTEE_FAILURE,
  FETCH_MENTEE_START,
  FETCH_MENTOR_SUCCESS,
  FETCH_MENTOR_FAILURE,
  FETCH_MENTOR_START,
  FETCH_MENTEE_BY_LAST_NAME_START,
  FETCH_MENTEE_BY_LAST_NAME_SUCCESS,
  FETCH_MENTEE_BY_LAST_NAME_FAILURE,
} from '../actions/actionTypes';

import { debugLog } from '../../utils/debugMode.js'; //

const initialState = {
  villageData: {},
  schoolData: [],
  headmasterProfile: '',
  mentees: [],
  isLoading: true,
  searchedMentee: [],
  mentors: [],
};
// Fetch school data for headmaster
const reducer = (state = initialState, action) => {
  // console.log('HEADMASTERREDUCER.js, action type & payload:', action.type, action.payload);
  switch (action.type) {
    case FETCH_HEADMASTER_SCHOOLS:
      debugLog(action.type, action.payload);
      return { ...state, schoolData: action.payload };
    case FETCH_HEADMASTER_PROFILE:
      debugLog(action.type, action.payload);
      return { ...state, headmasterProfile: action.payload };
    case FETCH_VILLAGE:
      debugLog(action.type, action.payload);
      return {
        ...state,
        villageData: action.payload,
      };
    case FETCH_MENTEE_SUCCESS:
      debugLog(action.type, action.payload);
      return {
        ...state,
        isLoading: false,
        mentees: action.payload,
      };
    case FETCH_MENTEE_START:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: true };
    case FETCH_MENTEE_FAILURE:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false };

    case FETCH_MENTOR_SUCCESS:
      debugLog(action.type, action.payload);
      return {
        ...state,
        isLoading: false,
        mentors: action.payload,
      };
    case FETCH_MENTOR_START:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: true };
    case FETCH_MENTOR_FAILURE:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false };

    case FETCH_MENTEE_BY_LAST_NAME_START:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: true };
    case FETCH_MENTEE_BY_LAST_NAME_SUCCESS:
      debugLog(action.type, action.payload);
      return { ...state, searchedMentee: action.payload, isLoading: false };
    case FETCH_MENTEE_BY_LAST_NAME_FAILURE:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
