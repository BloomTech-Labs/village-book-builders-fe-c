// Reducer file for FullCalendar

import {
  FETCH_CALENDAR_START,
  FETCH_CALENDAR_SUCCESS,
  FETCH_CALENDAR_FAILURE,
  CREATE_CALENDAR_EVENT_START,
  CREATE_CALENDAR_EVENT_SUCCESS,
  CREATE_CALENDAR_EVENT_FAIL,
  EDIT_CALENDAR_EVENT_START,
  EDIT_CALENDAR_EVENT_SUCCESS,
  EDIT_CALENDAR_EVENT_FAIL,
  REMOVE_CALENDAR_EVENT_START,
  REMOVE_CALENDAR_EVENT_SUCCESS,
  REMOVE_CALENDAR_EVENT_FAIL,
  CHANGE_SELECTED_COMPUTER,
  SHOW_MODAL,
  HIDE_MODAL,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  events: [],
  selectedComputerId: 1,
  matchingModalVisible: false,
  PersonInfoModal: {
    first_name: null,
    last_name: null,
    gender: null,
    primary_language: null,
    dob: null,
    academic_description: null,
  },
  errors: {},
};

const calendarReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_CALENDAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: [...action.payload],
      };
    case FETCH_CALENDAR_START:
    case CREATE_CALENDAR_EVENT_START:
    case EDIT_CALENDAR_EVENT_START:
    case REMOVE_CALENDAR_EVENT_START:
      return { ...state, isLoading: true };
    case FETCH_CALENDAR_FAILURE:
    case CREATE_CALENDAR_EVENT_FAIL:
    case EDIT_CALENDAR_EVENT_FAIL:
    case REMOVE_CALENDAR_EVENT_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };

    case CREATE_CALENDAR_EVENT_SUCCESS:
      const { title, start, id, end, mentor, mentee } = action.payload;
      const newEvent = {
        title,
        start,
        end,
        id,
        mentor,
        mentee,
        computerId: state.selectedComputerId,
      };
      return {
        ...state,
        isLoading: false,
        events: [...state.events, newEvent],
      };
    case EDIT_CALENDAR_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: state.events.map(event => {
          if (event.id === action.payload.id) event = action.payload;
          return event;
        }),
      };
    case REMOVE_CALENDAR_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: state.events.filter(
          session => session.id !== action.payload.id
        ),
      };

    case CHANGE_SELECTED_COMPUTER:
      return {
        ...state,
        selectedComputerId: action.payload,
      };

    case SHOW_MODAL:
      return {
        ...state,
        personInfoModalVisible: true,
        PersonInfoModal: action.payload,
      };
    case HIDE_MODAL:
      return { ...state, personInfoModalVisible: false };

    default:
      return state;
  }
};

export default calendarReducer;
