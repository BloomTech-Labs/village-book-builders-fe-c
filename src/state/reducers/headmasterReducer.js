// Reducer file for Headmaster & Mentee

import {
  FETCH_MENTEE_AFTER_POST_SUCCESS,
  FETCH_MENTEE_AFTER_DELETE_SUCCESS,
  FETCH_HEADMASTER_SCHOOLS,
  FETCH_VILLAGE,
  FETCH_HEADMASTER_PROFILE,
  FETCH_MENTEE_SUCCESS,
  FETCH_MENTEE_FAILURE,
  FETCH_MENTEE_START,
  FETCH_MENTOR_SUCCESS,
  FETCH_MENTOR_FAILURE,
  FETCH_MENTOR_START,
} from '../actions/actionTypes';

// import { debugLog } from '../../utils/debugMode.js';

const initialState = {
  villageData: {},
  schoolData: [],
  headmasterProfile: '',
  mentees: [],
  isLoading: true,
  mentors: [],
};
// Fetch school data for headmaster
// es-lint
const reducer = (state = initialState, action = {}) => {
  // debugLog(action.type, action.payload);

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
    case FETCH_MENTEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mentees: action.payload,
      };
    case FETCH_MENTEE_AFTER_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mentees: [...state.mentees, action.payload.mentee],
        message: action.payload.message,
      };
    case FETCH_MENTEE_AFTER_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mentees: state.mentees.filter(
          mentee => mentee.id !== action.payload.mentee
        ),
        message: action.payload.message,
      };
    case FETCH_MENTEE_START:
      return { ...state, isLoading: true };
    case FETCH_MENTEE_FAILURE:
      return { ...state, isLoading: false };

    case FETCH_MENTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mentors: [...action.payload],
      };
    case FETCH_MENTOR_START:
      return { ...state, isLoading: true };
    case FETCH_MENTOR_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default reducer;
