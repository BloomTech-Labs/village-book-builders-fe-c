import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchVillage } from '../../../state/actions/index';

import { Profile, Label } from '../../common/ProfileStyle';
import { Button } from '../../common/';
import { ThemeProvider } from 'styled-components';
import { ComponentTitle } from '../../common';

const Village = props => {
  const { villageData, fetchVillage } = props;
  useEffect(() => {
    console.log('village component useEffect', villageData);
    fetchVillage(0); // !This headmaster ID is being hardcoded right now
  }, []);
  console.log('village component, villageData', villageData);
  return (
    <Profile>
      <ComponentTitle titleText="Village" />
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
        <Link to={`/village/edit/${villageData.id}`}>
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
