import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const School = props => {
  const { school } = props;

  return (
    <div>
      <p>School: {school.name}</p>
      <p>Description: {school.school_description}</p>
      <p>Goals: {school.school_goals}</p>
      <p>Needs: {school.school_needs}</p>
      <p>Student Count: {school.count_students_currently_enrolled}</p>
      <p>Teacher Count: {school.count_teachers}</p>
      <p>Notes: {school.notes}</p>

      <Link to={`/school/edit/${school.id}`}>
        <Button buttonText="Edit School Profile" />
      </Link>
    </div>
  );
};

export default connect(null, {})(School);
