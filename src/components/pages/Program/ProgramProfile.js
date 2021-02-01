import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProgramProfile } from '../../../state/actions';
import { Button } from 'antd';

const ProgramProfile = ({ profile, fetchProgramProfile }) => {
  useEffect(() => {
    fetchProgramProfile(0); // change this later with login
  }, [fetchProgramProfile]);
  // console.log(profile);

  return (
    <div>
      <h1>Profile</h1>
      <p>Program Name: {`${profile.name}`}</p>
      <p>Location: {profile.location}</p>
      <p>Library ID: {profile.libraryId}</p>
      <div>
        <Link to={`/profile/edit/${profile.id}`}>
          <Button>Edit</Button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.programReducer.programProfile,
  };
};

export default connect(mapStateToProps, { fetchProgramProfile })(
  ProgramProfile
);
