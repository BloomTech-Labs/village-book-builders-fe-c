import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchHeadmasterProfile } from '../../../state/actions';

const HeadmasterHome = props => {
  const { profile } = props;

  useEffect(() => {
    props.fetchHeadmasterProfile(1); // change this later with login
  }, []);
  console.log(profile);

  return (
    <div>
      <h1>
        Hello,{' '}
        <span
          style={{ color: '#6AC66B' }}
        >{`Headmaster ${profile.last_name}`}</span>
      </h1>
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
