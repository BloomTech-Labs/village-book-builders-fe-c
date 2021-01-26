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
    <div style={{ padding: '2rem 2rem 2rem 0' }}>
      <h1>
        Hello, <span style={{ color: '#6AC66B' }}>{`${profile.name}`}</span>
      </h1>
      <h2>OUR MISSION</h2>
      <p>
        We are a non-profit organization{' '}
        <span class="color-1" style={{ fontWeight: 'bold' }}>
          EMPOWERING
        </span>{' '}
        villages around the world to drive{' '}
        <span class="color-2" style={{ fontWeight: 'bold' }}>
          CHANGE
        </span>{' '}
        and end the cycle of poverty through{' '}
        <span class="color-3" style={{ fontWeight: 'bold' }}>
          EDUCATION
        </span>
        .
      </p>
      <p>
        Education plays a big role in the development of a community and{' '}
        <span class="color-4" style={{ fontWeight: 'bold' }}>
          BUILDING
        </span>{' '}
        a library is just the first step towards creating a space dedicated to
        learning.
      </p>
      <p>
        By providing tools to measure academic improvement, & continue
        encouraging education through online mentoring we are able to{' '}
        <span class="color-5" style={{ fontWeight: 'bold' }}>
          CONNECT
        </span>{' '}
        children to brighter futures.
      </p>
      <p>
        We call this{' '}
        <span class="color-6" style={{ fontWeight: 'bold' }}>
          HOPE
        </span>{' '}
        through books.
      </p>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.programReducer.programProfile,
  };
};

export default connect(mapStateToProps, { fetchProgramProfile })(ProgramHome);
