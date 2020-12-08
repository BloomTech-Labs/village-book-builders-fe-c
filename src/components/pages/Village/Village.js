import React from 'react';
import { Link, Route } from 'react-router-dom';

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
    <div>
      <h3>Village Component</h3>
      <p>Headmaster: {dummyData.headmaster}</p>
      <p>Village Contact: {dummyData.villageContact}</p>
      <p>Village Contact Phone: {dummyData.villagePhone}</p>
      <div className="educationInfo">
        <p>Education Contact:</p>
        <p>{dummyData.educationContact}</p>
        <p>{dummyData.educationPhone}</p>
        <p>{dummyData.educationEmail}</p>
        <p>Notes: {dummyData.notes}</p>
      </div>
      <div className="villageButtons">
        <Link to="/village/edit">Edit</Link>
      </div>
    </div>
  );
};

export default Village;
