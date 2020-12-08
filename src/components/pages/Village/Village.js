import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchVillage } from '../../../state/actions/index';

import { MainContainer, VillageProfile, Label } from './Village.styles';

const Village = props => {
  const { villageData, fetchVillage } = props;
  useEffect(() => {
    fetchVillage(1); // !This headmaster ID is being hardcoded right now
  }, []);
  console.log(villageData);
  return (
    <VillageProfile>
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
    </VillageProfile>
  );
};

const mapStateToProps = state => {
  return {
    villageData: state.headmasterReducer.villageData,
  };
};

export default connect(mapStateToProps, { fetchVillage })(Village);
