import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider } from 'antd';

const School = props => {
  const { school } = props;

  return (
    <div className="school-village-container">
      <div className="school-container">
        <h1>{school.name}</h1>
        <div>
          <span>Description:</span> {school.school_description}
        </div>
        <div>
          <span>Goals:</span> {school.school_goals}
        </div>
        <div>
          <span>Needs:</span> {school.school_needs}
        </div>
        <div>
          <span>Student Count:</span> {school.count_students_currently_enrolled}
        </div>
        <div>
          <span>Teacher Count:</span> {school.count_teachers}
        </div>
        <div>
          <span>Notes:</span> {school.notes}
        </div>
        <Link to={`/school/edit/${school.id}`}>
          <Button style={{ margin: '.5rem 0' }}>Edit</Button>
        </Link>
        <Divider></Divider>
      </div>
    </div>
  );
};

export default connect(null, {})(School);
