import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchHeadmasterProfile as fetchHeadmasterProfileAction } from '../../../state/actions';
import { ArrowLeftOutlined } from '@ant-design/icons';

const HeadmasterHome = props => {
  const {
    profile,
    fetchHeadmasterProfileAction: fetchHeadmasterProfile,
  } = props;

  useEffect(() => {
    fetchHeadmasterProfile(1); // change this later with login
  }, [fetchHeadmasterProfile]);
  //console.log(profile);

  return (
    <div>
      <div className="home-header-pic">
        <img
          className="profile-pic-2"
          alt="Headmaster Profile"
          src={profile.headmasters_picture}
        />
        <h1 style={{ textAlign: 'center' }} className="page-title">
          Welcome Back!
        </h1>
      </div>
      <img
        className="home-header-image"
        alt="Village Book Builders"
        src="../images/vbb-full-logo.png"
      ></img>
      <div className="home-arrow-text">
        <div className="home-arrow">
          <ArrowLeftOutlined />
        </div>
        <h2 className="home-h2">What are you looking for?</h2>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.headmasterReducer.headmasterProfile,
  };
};

export default connect(mapStateToProps, { fetchHeadmasterProfileAction })(
  HeadmasterHome
);
