import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchVillage } from '../../../state/actions/index';

import { Profile, Label } from '../../common/ProfileStyle';
import Button from '../../common/Button';
import { ThemeProvider } from 'styled-components';

const Village = props => {
  const { villageData, fetchVillage } = props;
  useEffect(() => {
    fetchVillage(1); // !This headmaster ID is being hardcoded right now
  }, []);
  return (
    <Profile>
      <Label>Headmaster:</Label>
      <p>Mr Headmaster</p>
      <Label>Village Contact:</Label>
      <p>{villageData.villageContactName}</p>
      <Label>Village Contact Phone:</Label>
      <p>{villageData.villageContactPhone}</p>

      <Label>Education Contact:</Label>
      <p>{villageData.educationContactName}</p>
      <p>{villageData.educationContactEmail}</p>
      <p>{villageData.educationContactPhone}</p>
      <p>Notes: {villageData.notes}</p>
      <div className="villageButtons">
        <Link to={`/headmaster/village/edit/${villageData.id}`}>
          <ThemeProvider theme={{ color: '#6ac66b' }}>
            <Button buttonText="Edit Village Profile" />
          </ThemeProvider>
        </Link>
      </div>
    </Profile>
  );
};

const mapStateToProps = state => {
  return {
    villageData: state.headmasterReducer.villageData,
  };
};

export default connect(mapStateToProps, { fetchVillage })(Village);
