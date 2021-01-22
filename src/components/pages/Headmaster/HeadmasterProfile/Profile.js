import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import { fetchHeadmasterProfile } from '../../../../state/actions';

import { Profile, Label } from '../../../common/ProfileStyle';
import { Button } from '../../../common/';
import { ComponentTitle } from '../../../common';

// const baseURL = 'https://cors-anywhere.herokuapp.com/http://54.158.134.245/api';
const HeadmasterProfile = props => {
  const { profile } = props;
  useEffect(() => {
    props.fetchHeadmasterProfile(1); // change this later with login
  }, []);
  console.log(profile);
  return (
    <Profile>
      <ComponentTitle titleText="Profile" />
      <img src={`${profile.headmasters_picture}`} />
      <Label>Name:</Label>
      <p>{`${profile.first_name} ${profile.last_name}`}</p>

      <Label>Gender:</Label>
      <p>{profile.gender}</p>

      <Label>Address:</Label>
      <p>{profile.address}</p>

      <Label>Bio:</Label>
      <p>{profile.bio}</p>

      <Label>Communication App:</Label>
      <p>{profile.communication_app}</p>

      <Label>DOB:</Label>
      <p>{profile.dob}</p>

      <Label>General Availability:</Label>
      <p>{profile.general_availability}</p>

      <Label>Mentor Advisor Point of Contact:</Label>
      <p>{profile.mentor_advisor_point_of_contact}</p>

      <Label>Mentor Program Goals:</Label>
      <p>{profile.goals_mentor_program}</p>

      <Label>Personal Goals:</Label>
      <p>{profile.goals_personal}</p>

      <Label>School Community Goals:</Label>
      <p>{profile.goals_school_community}</p>

      <Label>Goals Mentor Program:</Label>
      <p>{profile.goals_mentor_program}</p>

      <p></p>

      <Label>Time Zone:</Label>
      <p>{profile.time_zone}</p>
      <div className="villageButtons">
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
    profile: state.headmasterReducer.headmasterProfile,
  };
};

export default connect(mapStateToProps, { fetchHeadmasterProfile })(
  HeadmasterProfile
);
