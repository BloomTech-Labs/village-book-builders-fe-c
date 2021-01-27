import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { fetchProgramProfile } from '../../../state/actions';
import { Profile, Label } from '../../common/ProfileStyle';
import { Button, ComponentTitle } from '../../common';

const ProgramProfile = ({ profile, fetchProgramProfile }) => {
  useEffect(() => {
    fetchProgramProfile(0); // change this later with login
  }, [fetchProgramProfile]);
  // console.log(profile);
  return (
    <Profile>
      <ComponentTitle titleText="Profile" />

      <Label>Program Name:</Label>
      <p>{`${profile.name}`}</p>

      <Label>Location:</Label>
      <p>{profile.location}</p>

      <Label>Library ID:</Label>
      <p>{profile.libraryId}</p>

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
    profile: state.programReducer.programProfile,
  };
};

export default connect(mapStateToProps, { fetchProgramProfile })(
  ProgramProfile
);
