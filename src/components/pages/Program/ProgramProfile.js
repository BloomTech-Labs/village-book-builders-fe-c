import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { fetchProgramProfile } from '../../../state/actions';
import { Profile, Label } from '../../common/ProfileStyle';
import { Button, ComponentTitle } from '../../common';

const ProgramProfile = props => {
  const { profile } = props;
  useEffect(() => {
    props.fetchProgramProfile(1); // change this later with login
  }, []);
  // console.log(profile);
  return (
    <Profile>
      <ComponentTitle titleText="Profile" />

      <Label>Program Name:</Label>
      <p>{`${profile.name}`}</p>

      <Label>Location:</Label>
      <p>{profile.location}</p>

      <div>
        <Link to={`/program/${profile.id}`}>
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
