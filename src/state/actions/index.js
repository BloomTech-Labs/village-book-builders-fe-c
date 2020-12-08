// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file
import axios from 'axios';

import * as actionTypes from './actionTypes';

export const fetchHeadmasterSchool = () => dispatch => {
  dispatch({ type: actionTypes.FETCH_HEADMASTER_SCHOOL });
};

export const fetchVillage = id => dispatch => {
  axios
    .get(`/headmaster/village/${id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: actionTypes.FETCH_VILLAGE });
    })
    .catch(err => console.dir(err));
};
