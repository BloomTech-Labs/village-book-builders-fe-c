import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSchool } from '../../../state/actions/index';

const School = props => {
  console.log('School Component --> ', props);
  const { school } = props;
  useEffect(() => {}, []);
  return (
    <div>
      <h1>School</h1>
      <p>Description: {school.school_description}</p>
      <p>Goals: {school.school_goals_description}</p>
      <p>Needs: {school.school_needs_description}</p>
      <p>Student Count: {school.count_students_currently_enrolled}</p>
      <p>Teacher Count: {school.count_teachers}</p>
      <p>Notes: {school.notes}</p>
      <Link to={`/headmaster/school/edit/${school.id}`}>Edit School</Link>
    </div>
  );
};

export default connect(null, {})(School);
