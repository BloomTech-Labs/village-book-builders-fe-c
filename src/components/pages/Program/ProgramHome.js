import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProgramProfile } from '../../../state/actions';

const ProgramHome = ({ profile, fetchProgramProfile }) => {
  useEffect(() => {
    fetchProgramProfile(0); // change this later with login
  }, [fetchProgramProfile]);
  console.log(profile);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }} className="page-title">
        Home
      </h1>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.programReducer.programProfile,
  };
};

export default connect(mapStateToProps, { fetchProgramProfile })(ProgramHome);
