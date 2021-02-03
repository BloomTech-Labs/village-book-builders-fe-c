import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTeacherProfile } from '../../../state/actions';

const TeacherHome = props => {
  const { profile } = props;

  useEffect(() => {
    props.fetchTeacherProfile(1); // change this later with login
  }, []);
  console.log(profile);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }} className="page-title">
        Home
      </h1>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.teacherReducer.teacherProfile,
  };
};

export default connect(mapStateToProps, { fetchTeacherProfile })(TeacherHome);
