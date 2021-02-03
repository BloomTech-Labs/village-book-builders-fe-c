import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTeacherProfile } from '../../../state/actions';
import { Form, Input, Button } from 'antd';

const TeacherProfile = ({ fetchTeacherProfile, profile }) => {
  useEffect(() => {
    fetchTeacherProfile(0); // change this later with login
  }, [fetchTeacherProfile]);

  console.log('inside the teacher edit form', profile);
  return (
    <div>
      <h1>Profile</h1>
      <img src={profile.teachers_picture} alt="the teacher of this class" />
      <p>Name: {`${profile.first_name} ${profile.last_name}`}</p>
      <p>Gender: {profile.gender}</p>
      <p>Address: {profile.address}</p>
      <div>
        <Link to={`/profile/edit/${profile.id}`}>
          <Button>Edit</Button>
        </Link>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    profile: state.teacherReducer.teacherProfile,
  };
};
export default connect(mapStateToProps, { fetchTeacherProfile })(
  TeacherProfile
);
