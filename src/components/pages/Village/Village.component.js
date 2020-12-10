import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchVillage } from '../../../state/actions/index';

import { Profile, Label } from '../../common/ProfileStyle';

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
      <p>{villageData.village_contact_name}</p>
      <Label>Village Contact Phone:</Label>
      <p>{villageData.village_contact_phone}</p>

      <Label>Education Contact:</Label>
      <p>{villageData.education_contact.name}</p>
      <p>{villageData.education_contact.phone}</p>
      <p>{villageData.education_contact.email}</p>
      <p>Notes: {villageData.notes}</p>
      <div className="villageButtons">
        <Link to={`/village/edit/${villageData.id}`}>Edit Village Profile</Link>
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
