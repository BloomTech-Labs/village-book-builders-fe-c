import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProgramProfile } from '../../../state/actions';

const ProgramHome = props => {
  const { profile } = props;

  useEffect(() => {
    props.fetchProgramProfile(1); // change this later with login
  }, []);
  console.log(profile);

  return (
    <div>
      <h1>
        Hello, <span style={{ color: '#6AC66B' }}>{`${profile.name}`}</span>
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
