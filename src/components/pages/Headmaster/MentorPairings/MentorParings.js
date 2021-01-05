import axios from 'axios';
import React, { useEffect } from 'react';
import { axiosWithAuth } from '../../../../utils/axiosWithAuth';
const MentorParings = () => {
  useEffect(() => {
    axiosWithAuth()
      .get('student')
      .then(res => console.log(res));
    // console.log(axiosWithAuth);
  }, []);
  return (
    <>
      <h1>Mentor Pairings</h1>
    </>
  );
};

export default MentorParings;
