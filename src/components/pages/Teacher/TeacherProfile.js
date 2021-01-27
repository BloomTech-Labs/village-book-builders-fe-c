import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { fetchTeacherProfile } from '../../../state/actions';
import { Profile, Label } from '../../common/ProfileStyle';
import { Button, ComponentTitle } from '../../common';

const TeacherProfile = ({ fetchTeacherProfile, profile }) => {
  useEffect(() => {
    fetchTeacherProfile(0); // change this later with login
  }, [fetchTeacherProfile]);

  console.log('inside the teacher edit form', profile);
  return (
    <Profile>
      <ComponentTitle titleText="Profile" />
      <img src={profile.teachers_picture} alt="the teacher of this class" />
      <Label>Name:</Label>
      <p>{`${profile.first_name} ${profile.last_name}`}</p>
      <p>{profile.gender}</p>
      <Label>Address:</Label>
      <p>{profile.address}</p>
      <div>
        <Link to={`/profile/edit/${profile.id}`}>
          <ThemeProvider theme={{ color: '#6ac66b' }}>
            <Button buttonText="Edit Your Profile" />
          </ThemeProvider>
        </Link>
      </div>
    </Profile>
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
