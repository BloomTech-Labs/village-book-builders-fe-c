// Reducer file for Student Resources
import { FETCH_STUDENT_RESOURCES } from '../actions/actionTypes';

import { debugLog } from '../../utils/debugMode.js';

const initialState = {
  studentResource: [],
  isLoading: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_STUDENT_RESOURCES:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false, studentResource: action.payload };
    default:
      return state;
  }
};

export default reducer;
