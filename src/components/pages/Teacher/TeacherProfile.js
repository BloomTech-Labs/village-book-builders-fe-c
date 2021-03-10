import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTeacherProfile as fetchTeacherProfileAction } from '../../../state/actions';
import { Button } from 'antd';

const TeacherProfile = ({
  fetchTeacherProfileAction: fetchTeacherProfile,
  profile,
}) => {
  useEffect(() => {
    fetchTeacherProfile(0); // change this later with login
  }, [fetchTeacherProfile]);

  console.log('inside the teacher edit form', profile);
  return (
    <div className="form-container">
      <div>
        <h1 className="page-title">Profile</h1>
        <img
          src={profile.teachers_picture}
          alt="the teacher of this class"
          className="profile-pic"
        />
        <div className="profile-item-title">Name</div>
        <div className="profile-item">
          {profile.first_name} {profile.last_name}
        </div>
        <div className="profile-item-title">Gender</div>
        <div className="profile-item">{profile.gender}</div>
        <div className="profile-item-title">Address</div>
        <div className="profile-item">{profile.address}</div>
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
    profile: state.teacherReducer.teacherProfile,
  };
};
export default connect(mapStateToProps, { fetchTeacherProfileAction })(
  TeacherProfile
);
