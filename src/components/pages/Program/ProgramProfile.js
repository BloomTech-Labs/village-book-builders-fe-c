import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProgramProfile as fetchProgramProfileAction } from '../../../state/actions';
import { Button } from 'antd';

const ProgramProfile = ({
  profile,
  fetchProgramProfileAction: fetchProgramProfile,
}) => {
  useEffect(() => {
    fetchProgramProfile(0); // change this later with login
  }, [fetchProgramProfile]);
  // console.log(profile);

  return (
    <div className="form-container">
      <div>
        <h1 className="page-title">Profile</h1>
        <div className="profile-item-title">Program Name</div>
        <div className="profile-item">{profile.name}</div>
        <div className="profile-item-title">Location</div>
        <div className="profile-item">{profile.location}</div>
        <div className="profile-item-title">Library ID</div>
        <div className="profile-item">{profile.libraryId}</div>
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
    profile: state.programReducer.programProfile,
  };
};

export default connect(mapStateToProps, { fetchProgramProfileAction })(
  ProgramProfile
);
