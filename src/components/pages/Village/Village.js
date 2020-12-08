import React from 'react';
import { Link, Route } from 'react-router-dom';

import { MainContainer, VillageProfile, Label } from './Village.styles';

const dummyData = {
  id: 123,
  headmaster: 'John Doe',
  villageContact: 'Jane Doe',
  villagePhone: '123-234-3456',
  educationContact: 'James Doe',
  educationPhone: '444-234-2342',
  educationEmail: 'email@example.com',
  notes: 'Lorem ipsum dolor sit am',
};

const Village = () => {
  return (
    <VillageProfile>
      <Label>Headmaster:</Label>
      <p>{dummyData.headmaster}</p>
      <Label>Village Contact:</Label>
      <p>{dummyData.villageContact}</p>
      <Label>Village Contact Phone:</Label>
      <p>{dummyData.villagePhone}</p>

      <Label>Education Contact:</Label>
      <p>{dummyData.educationContact}</p>
      <p>{dummyData.educationPhone}</p>
      <p>{dummyData.educationEmail}</p>
      <p>Notes: {dummyData.notes}</p>
      <div className="villageButtons">
        <Link to="/village/edit">Edit</Link>
      </div>
    </VillageProfile>
  );
};

export default Village;
