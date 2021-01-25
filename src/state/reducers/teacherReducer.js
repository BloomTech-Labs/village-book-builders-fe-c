// Reducer file for Teacher
import {
  FETCH_TEACHER_PROFILE,
  FETCH_TEACHER_PROFILE_SUCCESS,
  FETCH_TEACHER_PROFILE_FAILURE,
} from '../actions/actionTypes';

import { debugLog } from '../../utils/debugMode.js';

const initialState = {
  teacherProfile: '',
  isLoading: true,
};

const reducer = (state = initialState, action) => {
  // console.log('teacherReducer.js, action type & payload:', action.type, action.payload);
  switch (action.type) {
    case FETCH_TEACHER_PROFILE:
      debugLog(action.type, action.payload);
      return { ...state, teacherProfile: action.payload };
    case FETCH_TEACHER_PROFILE_SUCCESS:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false, teachers: action.payload };
    case FETCH_TEACHER_PROFILE_FAILURE:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
