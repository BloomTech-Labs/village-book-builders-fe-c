// Reducer file for FullCalendar

import {
  FETCH_CALENDAR_START,
  FETCH_CALENDAR_SUCCESS,
  FETCH_CALENDAR_FAILURE,
  CREATE_CALENDAR_EVENT,
  EDIT_CALENDAR_EVENT,
  REMOVE_CALENDAR_EVENT,
  ADD_CALENDAR_SESSION,
  EDIT_CALENDAR_SESSION,
  REMOVE_CALENDAR_SESSION,
  SHOW_MODAL,
  HIDE_MODAL,
} from '../actions/actionTypes';

import { v4 as uuid } from 'uuid';

const initialState = {
  isLoading: false,
  events: [],
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

const blankSession = {
  id: null,
  mentors: [],
  mentees: [],
  computerId: null,
};

const sessionsToEventsArray = sessions => {
  const map = {};

  sessions.forEach(session => {
    if (!(session.start in map)) {
      delete session.mentorId;
      delete session.menteeId;
      map[session.start] = {
        id: uuid(),
        title: 'Session',
        start: session.start,
        end: session.end,
        sessions: [
          {
            ...session,
          },
        ],
      };
    } else {
      map[session.start].sessions.push(session);
    }
  });

  const events = [];
  Object.keys(map).forEach(key => events.push(map[key]));

  return events;
};

const calendarReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_CALENDAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: [...sessionsToEventsArray(action.payload)],
      };
    case FETCH_CALENDAR_START:
      return { ...state, isLoading: true };
    case FETCH_CALENDAR_FAILURE:
      return { ...state, isLoading: false };

    case CREATE_CALENDAR_EVENT:
      const { title, start, id, end } = action.payload;
      const sessions = [{ ...blankSession }];
      const newEvent = { title, start, end, id, sessions };
      return {
        ...state,
        events: [...state.events, newEvent],
      };
    case EDIT_CALENDAR_EVENT:
      return {
        ...state,
        events: state.events.map(event => {
          if (event.id === action.payload.id) event = action.payload;
          return event;
        }),
      };
    case REMOVE_CALENDAR_EVENT:
      return {
        ...state,
        events: state.events.filter(
          session => session.id !== action.payload.id
        ),
      };

    case ADD_CALENDAR_SESSION:
      return {
        ...state,
        events: state.events.map(event => {
          if (event.id === action.payload.id) {
            const newSession = { ...blankSession };
            newSession.id = uuid();
            newSession.computerId = 1; // HARDCODED CHANGE LATER
            event.sessions = [...event.sessions, newSession];
          }
          delete event.extendedProps;
          return event;
        }),
      };

    case SHOW_MODAL:
      return { ...state, matchingModalVisible: true };
    case HIDE_MODAL:
      return { ...state, matchingModalVisible: false };

    case EDIT_CALENDAR_SESSION:
    case REMOVE_CALENDAR_SESSION:
    default:
      return state;
  }
};

export default calendarReducer;
