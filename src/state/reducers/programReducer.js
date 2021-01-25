// Reducer file for Program
import {
  FETCH_PROGRAM_PROFILE,
  FETCH_PROGRAM_PROFILE_SUCCESS,
  FETCH_PROGRAM_PROFILE_FAILURE,
} from '../actions/actionTypes';

import { debugLog } from '../../utils/debugMode.js';

const initialState = {
  programProfile: '',
  isLoading: true,
};

const reducer = (state = initialState, action) => {
  // console.log('programReducer.js, action type & payload:', action.type, action.payload);
  switch (action.type) {
    case FETCH_PROGRAM_PROFILE:
      debugLog(action.type, action.payload);
      return { ...state, programProfile: action.payload };
    case FETCH_PROGRAM_PROFILE_SUCCESS:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false, programs: action.payload };
    case FETCH_PROGRAM_PROFILE_FAILURE:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
