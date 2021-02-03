import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchHeadmasterProfile } from '../../../../state/actions';
import { Button } from 'antd';

// const baseURL = 'https://cors-anywhere.herokuapp.com/http://54.158.134.245/api';

const HeadmasterProfile = props => {
  const { profile } = props;
  useEffect(() => {
    props.fetchHeadmasterProfile(2); // change this later with login
  }, []);
  console.log(profile);

  return (
    <div className="form-container">
      <div>
        <h1 className="page-title">Profile</h1>
        <img className="profile-pic" src={profile.headmasters_picture} />
        <div className="profile-item-title">Name </div>
        <div className="profile-item">
          {profile.first_name} {profile.last_name}
        </div>
        <div className="profile-item-title">Gender</div>
        <div className="profile-item">{profile.gender}</div>
        <div className="profile-item-title">Address</div>
        <div className="profile-item">{profile.address}</div>
        <Link to={`/profile/edit/${profile.id}`}>
          <Button style={{ margin: '.5rem 0' }}>Edit</Button>
        </Link>
      </div>
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
