import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSchool } from '../../../state/actions/index';

const School = props => {
  useEffect(() => {
    props.fetchSchool(1); // ! This doesn't work yet. we don't have a school endpoint
  }, []);
  return (
    <div>
      <h1>School Component</h1>
      <Link to="/school/edit/1">Edit School</Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    state: state.headmasterReducer.schoolData,
  };
};

export default connect(mapStateToProps, { fetchSchool })(School);
