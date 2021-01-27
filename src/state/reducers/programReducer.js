// Reducer file for Program
import {
  FETCH_PROGRAM_PROFILE_START,
  FETCH_PROGRAM_PROFILE_SUCCESS,
  FETCH_PROGRAM_PROFILE_FAILURE,
  EDIT_PROGRAM_PROFILE_START,
  EDIT_PROGRAM_PROFILE_SUCCESS,
  EDIT_PROGRAM_PROFILE_FAILURE,
} from '../actions/actionTypes';

import { debugLog } from '../../utils/debugMode.js';

const initialState = {
  programProfile: {},
  isLoading: true,
};

const reducer = (state = initialState, action) => {
  // console.log('programReducer.js, action type & payload:', action.type, action.payload);
  switch (action.type) {
    case FETCH_PROGRAM_PROFILE_START:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: true };
    case FETCH_PROGRAM_PROFILE_SUCCESS:
      debugLog(action.type, action.payload);
      return { ...state, programProfile: action.payload, isLoading: false };
    case FETCH_PROGRAM_PROFILE_FAILURE:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false };
    case EDIT_PROGRAM_PROFILE_START:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: true };
    case EDIT_PROGRAM_PROFILE_SUCCESS:
      debugLog(action.type, action.payload);
      return { ...state, programProfile: action.payload, isLoading: false };
    case EDIT_PROGRAM_PROFILE_FAILURE:
      debugLog(action.type, action.payload);
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
