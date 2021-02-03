import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { fetchMenteeProfile } from '../../../state/actions';

const StudentProfile = ({ fetchMenteeProfile, profile }) => {
  useEffect(() => {
    fetchMenteeProfile(1); // change this later with login
  }, [fetchMenteeProfile]);
  console.log('inside the student profile', profile);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1 className="page-title">Profile</h1>
        <img
          className="profile-pic"
          src={profile.mentee_picture}
          alt="student profile"
        />
        <div className="profile-item-title">Name</div>
        <div className="profile-item">
          {profile.first_name} {profile.last_name}
        </div>
        <div className="profile-item-title">Gender</div>
        <div className="profile-item">{profile.gender}</div>
        <div className="profile-item-title">Email</div>
        <div className="profile-item">{profile.email}</div>
        <div className="profile-item-title">English level</div>
        <div className="profile-item">{profile.english_lvl}</div>
        <div className="profile-item-title">Math level</div>
        <div className="profile-item">{profile.math_lvl}</div>
        <div className="profile-item-title">Reading level</div>
        <div className="profile-item">{profile.reading_lvl}</div>
        <div className="profile-item-title">School level</div>
        <div className="profile-item">{profile.school_lvl}</div>
        <div className="profile-item-title">Academic description</div>
        <div className="profile-item">{profile.academic_description}</div>
        <div className="profile-item-title">Support needed</div>
        <div className="profile-item">{profile.support_needed}</div>
        <div>
          <Link to={`/profile/edit/${profile.id}`}>
            <Button style={{ margin: '.5rem 0' }}>Edit</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.menteeReducer.menteeProfile,
  };
};
export default connect(mapStateToProps, { fetchMenteeProfile })(StudentProfile);
