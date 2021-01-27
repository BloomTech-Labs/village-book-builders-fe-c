import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { fetchMenteeProfile } from '../../../state/actions';
import { Profile, Label } from '../../common/ProfileStyle';
import { Button, ComponentTitle } from '../../common';

const StudentProfile = ({ fetchMenteeProfile, profile, isLoading }) => {
  useEffect(() => {
    fetchMenteeProfile(3); // change this later with login
  }, [fetchMenteeProfile]);
  console.log('inside the student profile', profile);
  return (
    <Profile>
      <ComponentTitle titleText="Profile" />
      <img src={profile.mentee_picture} alt="student " />
      <Label>Name:</Label>
      <p>{`${profile.first_name} ${profile.last_name}`}</p>
      <p>{profile.gender}</p>
      <Label>Email:</Label>
      <p>{profile.email}</p>
      <div>
        <Label>Academics:</Label>
        <p>English level: {profile.english_lvl}</p>
        <p>Math level: {profile.math_lvl}</p>
        <p>Reading level: {profile.reading_lvl}</p>
        <p>School level: {profile.school_lvl}</p>
        <p>{profile.academic_description}</p>
      </div>
      <Label>Support Needed</Label>
      <p>{profile.support_needed}</p>
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
    profile: state.menteeReducer.menteeProfile,
    isLoading: state.menteeReducer.isLoading,
  };
};
export default connect(mapStateToProps, { fetchMenteeProfile })(StudentProfile);
