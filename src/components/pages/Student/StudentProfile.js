import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { fetchMenteeProfile } from '../../../state/actions';

const StudentProfile = ({ fetchMenteeProfile, profile, isLoading }) => {
  useEffect(() => {
    fetchMenteeProfile(1); // change this later with login
  }, []);
  console.log('inside the student profile', profile);

  return (
    <div>
      {isLoading ? (
        '...loading'
      ) : (
        <div>
          <h1>Profile</h1>
          <img src={profile.mentee_picture} alt="student " />
          <p>{`Name: ${profile.first_name} ${profile.last_name}`}</p>
          <p>Gender: {profile.gender}</p>
          <p>Email: {profile.email}</p>
          <div>
            <h3>Academics:</h3>
            <p>English level: {profile.english_lvl}</p>
            <p>Math level: {profile.math_lvl}</p>
            <p>Reading level: {profile.reading_lvl}</p>
            <p>School level: {profile.school_lvl}</p>
            <p>{profile.academic_description}</p>
          </div>
          <p>Support needed: {profile.support_needed}</p>
          <div>
            <Link to={`/profile/edit/${profile.id}`}>
              <Button>Edit Your Profile</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.menteeReducer.menteeProfile,
    isLoading: state.menteeReducer.isLoading,
  };
};
export default connect(mapStateToProps, { fetchMenteeProfile })(StudentProfile);
