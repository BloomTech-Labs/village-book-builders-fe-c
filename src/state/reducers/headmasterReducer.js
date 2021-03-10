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
  SHOW_MODAL,
  HIDE_MODAL,
  UPDATE_MATCH,
} from '../actions/actionTypes';

// import { debugLog } from '../../utils/debugMode.js';

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
  matchingModalVisible: false,
  matchingModal: {
    date: null,
    time: null,
    duration: '1hr',
    mentor: null,
    mentee: null,
    computerId: null,
  },
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
    case FETCH_MENTEE_START:
      return { ...state, isLoading: true };
    case FETCH_MENTEE_FAILURE:
      return { ...state, isLoading: false };

    case FETCH_MENTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mentors: action.payload,
      };
    case FETCH_MENTOR_START:
      return { ...state, isLoading: true };
    case FETCH_MENTOR_FAILURE:
      return { ...state, isLoading: false };

    case FETCH_CALENDAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        matches: action.payload,
      };
    case FETCH_CALENDAR_START:
      return { ...state, isLoading: true };
    case FETCH_CALENDAR_FAILURE:
      return { ...state, isLoading: false };

    case SHOW_MODAL:
      return { ...state, matchingModalVisible: true };

    case HIDE_MODAL:
      return { ...state, matchingModalVisible: false };

    case UPDATE_MATCH:
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
