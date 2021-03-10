import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTeacherProfile as fetchTeacherProfileAction } from '../../../state/actions';

const TeacherHome = props => {
  const { profile, fetchTeacherProfileAction: fetchTeacherProfile } = props;

  useEffect(() => {
    fetchTeacherProfile(1); // change this later with login
  }, [fetchTeacherProfile]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }} className="page-title">
        Home {profile.name}
      </h1>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.teacherReducer.teacherProfile,
  };
};

export default connect(mapStateToProps, { fetchTeacherProfileAction })(
  TeacherHome
);
