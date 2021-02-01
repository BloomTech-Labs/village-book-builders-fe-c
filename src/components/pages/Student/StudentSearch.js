import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  fetchMenteesBySearch,
  fetchMenteesByDateSearch,
} from '../../../state/actions/index';
import Moment from 'moment';
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const StudentSearch = props => {
  const [lastNameSearch, setLastNameSearch] = useState('');
  const [dobSearch, setDobSearch] = useState('');
  const history = useHistory();

  const { fetchMenteesBySearch } = props;
  const { fetchMenteesByDateSearch } = props;

  const onSubmit = e => {
    e.preventDefault();
    fetchMenteesBySearch(lastNameSearch);
    setLastNameSearch('');
  };

  const onDateSubmit = e => {
    /*DOB search currently not working due to JSON server having weird format for dates working on resolving 
    need to find out how to send 
    the date back in the same format that we received it*/
    e.preventDefault();
    fetchMenteesByDateSearch(dobSearch);
    setDobSearch('');
    console.log(dobSearch);
  };

  const onLastNameChange = e => {
    setLastNameSearch(e.target.value);
  };

  const onDobChange = e => {
    setDobSearch(e.target.value);
  };

  return (
    <div>
      <h1>Find a Student</h1>
      <Form onSubmit={onSubmit}>
        <label>Last Name: </label>
        <Input
          type="text"
          placeholder="Last Name"
          value={lastNameSearch}
          onChange={onLastNameChange}
        ></Input>
        <Button htmlType="button" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
      {/*DOB search currently not working due to JSON server having weird format for dates working on resolving */}
      <Form onSubmit={onDateSubmit}>
        <label>Date of Birth: </label>
        <Input
          type="date"
          placeholder="Date Of Birth"
          value={dobSearch}
          onChange={onDobChange}
        ></Input>
        <Button htmlType="button" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
      <div>
        {props.isLoading ? (
          ''
        ) : props.searchedMentee.length === 0 ? (
          <div>
            <br></br>
            <p>This student is not registered.</p>

            <Button
              onClick={() => {
                history.push('/studentregistration');
              }}
            >
              Register Student
            </Button>
          </div>
        ) : (
          props.searchedMentee.map(student => (
            <div>
              {/* this should all be styled in grid for easy viewing and we should consider importing cards as a styled component */}
              <img
                src={student.mentee_picture}
                alt="somethings here"
                style={{ borderRadius: '50%', width: '200px', height: '200px' }}
              />{' '}
              {/* temp styling */}
              <h2>
                {student.first_name} {student.last_name}
              </h2>
              <h3>Date Of Birth:{Moment(student.dob).format('YYYY-MM-DD')}</h3>
              <h3>Gender:{student.gender}</h3>
              <h3>Primary Language:{student.primary_language}</h3>
              <button>Update</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    searchedMentee: state.menteeReducer.searchedMentee,
    isLoading: state.menteeReducer.isLoading,
  };
};
export default connect(mapStateToProps, {
  fetchMenteesBySearch,
  fetchMenteesByDateSearch,
})(StudentSearch);
