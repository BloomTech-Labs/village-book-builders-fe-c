import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchHeadmasterProfile } from '../../../../state/actions';
import { Button } from 'antd';

// const baseURL = 'https://cors-anywhere.herokuapp.com/http://54.158.134.245/api';

const HeadmasterProfile = props => {
  const { profile } = props;
  useEffect(() => {
    props.fetchHeadmasterProfile(1); // change this later with login
  }, []);
  console.log(profile);

  return (
    <div>
      <h1>Profile</h1>
      <img src={`${profile.headmasters_picture}`} />
      <p>{`Name: ${profile.first_name} ${profile.last_name}`}</p>
      <p>Gender: {profile.gender}</p>
      <p>Address:{profile.address}</p>
      <p>Bio: {profile.bio}</p>
      <p>Communication App: {profile.communication_app}</p>
      <p>DOB:{profile.dob}</p>
      <p>General Availability: {profile.general_availability}</p>
      <p>
        Mentor Advisor Point of Contact:{' '}
        {profile.mentor_advisor_point_of_contact}
      </p>
      <p>Mentor Program Goals: {profile.goals_mentor_program}</p>
      <p>Personal Goals: {profile.goals_personal}</p>
      <p>School Community Goals: {profile.goals_school_community}</p>
      <p>Goals Mentor Program: {profile.goals_mentor_program}</p>
      <p>Time Zone: {profile.time_zone}</p>
      <Link to={`/profile/edit/${profile.id}`}>
        <Button>Edit Your Profile</Button>
      </Link>
    </div>
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
