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
      <h1>
        Hello,{' '}
        <span
          style={{ color: '#6AC66B' }}
        >{`${profile.first_name} ${profile.last_name}`}</span>
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
