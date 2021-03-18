// Reducer file for FullCalendar

import {
  FETCH_CALENDAR_START,
  FETCH_CALENDAR_SUCCESS,
  FETCH_CALENDAR_FAILURE,
  CREATE_CALENDAR_EVENT,
  EDIT_CALENDAR_EVENT,
  REMOVE_CALENDAR_EVENT,
  CHANGE_SELECTED_COMPUTER,
  SAVE_CALENDAR_START,
  SAVE_CALENDAR_SUCESS,
  SAVE_CALENDAR_FAILURE,
  SHOW_MODAL,
  HIDE_MODAL,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  changesMade: false,
  events: [],
  selectedComputerId: 1,
  matchingModalVisible: false,
  matchingModal: {
    date: null,
    time: null,
    duration: '1hr',
    mentor: null,
    mentee: null,
    computerId: null,
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
      return { ...state, isLoading: true, changesMade: false };
    case FETCH_CALENDAR_FAILURE:
      return {
        ...state,
        isLoading: false,
        changesMade: false,
        errors: action.payload,
      };

    case CREATE_CALENDAR_EVENT:
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
        events: [...state.events, newEvent],
        changesMade: true,
      };
    case EDIT_CALENDAR_EVENT:
      return {
        ...state,
        changesMade: true,
        events: state.events.map(event => {
          if (event.id === action.payload.id) event = action.payload;
          return event;
        }),
      };
    case REMOVE_CALENDAR_EVENT:
      return {
        ...state,
        changesMade: true,
        events: state.events.filter(
          session => session.id !== action.payload.id
        ),
      };

    case CHANGE_SELECTED_COMPUTER:
      return {
        ...state,
        selectedComputerId: action.payload,
      };

    case SAVE_CALENDAR_SUCESS:
      return {
        ...state,
        changesMade: false,
        isLoading: false,
      };
    case SAVE_CALENDAR_START:
      return {
        ...state,
        isLoading: true,
      };
    case SAVE_CALENDAR_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };

    case SHOW_MODAL:
      return { ...state, matchingModalVisible: true };
    case HIDE_MODAL:
      return { ...state, matchingModalVisible: false };

    default:
      return state;
  }
};

export default calendarReducer;
