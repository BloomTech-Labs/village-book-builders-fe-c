import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchVillage } from '../../../state/actions/index';

import { Profile, Label } from '../../common/ProfileStyle';
import { Button } from '../../common/';
import { ThemeProvider } from 'styled-components';
import { ComponentTitle } from '../../common';

const Village = ({ villageData, userId, fetchVillage }) => {
  // const { villageData, fetchVillage } = props;
  useEffect(() => {
    // console.log("village component useEffect", villageData);
    fetchVillage(userId); // !This headmaster ID is being hardcoded right now
  }, []);
  // console.log("village component, villageData", villageData);
  return (
    <Profile>
      <ComponentTitle titleText="Village" />
      <Label>Headmaster:</Label>
      <p>Mr Headmaster</p>
      <Label>Village Contact:</Label>
      <p>{villageData.village_contact_name}</p>
      <Label>Village Contact Phone:</Label>
      <p>{villageData.village_contact_phone}</p>

      <Label>Education Contact:</Label>
      {/* //! These are not in the data from server atm */}
      <p>{villageData.educationContactName}</p>
      <p>{villageData.educationContactEmail}</p>
      <p>{villageData.educationContactPhone}</p>
      <Label>Notes: </Label>
      <p>{villageData.notes}</p>
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
    userId: state.loginReducer.userId,
  };
};

export default connect(mapStateToProps, { fetchVillage })(Village);
