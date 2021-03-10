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
  FETCH_CALENDAR_START,
  FETCH_CALENDAR_SUCCESS,
  FETCH_CALENDAR_FAILURE,
} from '../actions/actionTypes';

import { debugLog } from '../../utils/debugMode.js'; //

const initialState = {
  villageData: {},
  schoolData: [],
  headmasterProfile: '',
  mentees: [],
  isLoading: true,
  mentors: [],
  matches: [
    {
      id: null,
      mentee: null,
      mentor: null,
      time: null,
      date: null,
      computerId: null,
    },
  ],
};
// Fetch school data for headmaster
const reducer = (state = initialState, action = {}) => {
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

    // TODO: Make these individual cases (they all do the same right now)
    case FETCH_MENTEE_START:
    case FETCH_MENTOR_START:
    case FETCH_CALENDAR_START:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: true };
    case FETCH_MENTEE_FAILURE:
    case FETCH_MENTOR_FAILURE:
    case FETCH_CALENDAR_FAILURE:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false };

    case FETCH_MENTOR_SUCCESS:
      debugLog(action.type, action.payload);
      return {
        ...state,
        isLoading: false,
        mentors: action.payload,
      };

    case FETCH_CALENDAR_SUCCESS:
      debugLog(action.type, action.payload);
      return {
        ...state,
        isLoading: false,
        matches: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
