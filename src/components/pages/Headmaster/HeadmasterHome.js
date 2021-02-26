import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchHeadmasterProfile } from '../../../state/actions';
import { ArrowLeftOutlined } from '@ant-design/icons';

const HeadmasterHome = props => {
  const { profile } = props;

  useEffect(() => {
    props.fetchHeadmasterProfile(1); // change this later with login
  }, []);
  console.log(profile);

  return (
    <div>
      <div className="home-header-pic">
        <img className="profile-pic-2" src={profile.headmasters_picture} />
        <h1 style={{ textAlign: 'center' }} className="page-title">
          Welcome Back!
        </h1>
      </div>
      <img
        className="home-header-image"
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

export default connect(mapStateToProps, { fetchHeadmasterProfile })(
  HeadmasterHome
);
