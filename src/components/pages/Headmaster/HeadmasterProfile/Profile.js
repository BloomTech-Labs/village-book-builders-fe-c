import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchHeadmasterProfile as fetchHeadmasterProfileAction } from '../../../../state/actions';
import { Button, Card } from 'antd';

const HeadmasterProfile = props => {
  const {
    profile,
    fetchHeadmasterProfileAction: fetchHeadmasterProfile,
  } = props;
  useEffect(() => {
    fetchHeadmasterProfile(1); // change this later with login
  }, [fetchHeadmasterProfile]);
  // console.log(profile);

  return (
    <Card
      style={{ width: 500, marginLeft: 85 }}
      hoverable
      className="form-container-profile"
    >
      <div>
        <h1 className="page-title">Profile</h1>
        <img
          className="profile-pic"
          alt="Headmaster"
          src={profile.headmasters_picture}
        />
        <div className="profile-item-title">Name </div>
        <div className="profile-item">
          {profile.first_name} {profile.last_name}
        </div>
        <div className="profile-item-title">Bio</div>
        <div className="profile-item">{profile.bio}</div>
        <div className="profile-item-title">Email</div>
        <div className="profile-item">{profile.email}</div>
        <div className="profile-item-title">Phone Number</div>
        <div className="profile-item">{profile.phone_number}</div>
        <div className="profile-item-title">Address</div>
        <div className="profile-item">{profile.address}</div>
        <div className="profile-item-title">Timezone</div>
        <div className="profile-item">{profile.time_zone}</div>
        <Link to={`/profile/edit/${profile.id}`}>
          <Button style={{ margin: '.5rem 0' }}>Edit</Button>
        </Link>
      </div>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.headmasterReducer.headmasterProfile,
  };
};

export default connect(mapStateToProps, { fetchHeadmasterProfileAction })(
  HeadmasterProfile
);
