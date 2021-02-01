import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  fetchMenteesBySearch,
  fetchMenteesByDateSearch,
} from '../../../state/actions/index';
import Moment from 'moment';
import { Input, Button, Alert, Space } from 'antd';
import { useHistory } from 'react-router-dom';

const StudentSearch = props => {
  const [lastNameSearch, setLastNameSearch] = useState('');
  // const [dobSearch, setDobSearch] = useState('');
  const history = useHistory();

  const { fetchMenteesBySearch } = props;
  // const { fetchMenteesByDateSearch } = props;

  const { Search } = Input;

  const onSubmit = e => {
    fetchMenteesBySearch(lastNameSearch);
    setLastNameSearch('');
  };

  // const onDateSubmit = e => {
  //   e.preventDefault();
  //   fetchMenteesByDateSearch(dobSearch);
  //   setDobSearch('');
  // };

  // const onDateSubmit = e => {
  //   /*DOB search currently not working due to JSON server having weird format for dates working on resolving
  //   need to find out how to send
  //   the date back in the same format that we received it*/
  //   e.preventDefault();
  //   fetchMenteesByDateSearch(dobSearch);
  //   setDobSearch('');
  //   console.log(dobSearch);
  // };

  const onLastNameChange = e => {
    setLastNameSearch(e.target.value);
  };

  // const onDobChange = e => {
  //   setDobSearch(e.target.value);
  // };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Find a Student</h1>
      <Space direction="vertical">
        <Search
          style={{ width: 300 }}
          placeholder="Student Last Name"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSubmit}
          onChange={onLastNameChange}
        />
      </Space>
      ,
      {/* DOB search currently not working due to JSON server having weird format for dates working on resolving
        <Space direction="vertical">
          <Search
            style={{ width: 300 }}
            placeholder="Student Last Name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onDateSubmit}
            onChange={onDobChange}
          />
        </Space>, */}
      <div>
        {props.isLoading ? (
          ''
        ) : props.searchedMentee.length === 0 ? (
          <div>
            <Alert
              message="This student is not registered."
              type="error"
              showIcon
            />
            <p style={{ padding: '1rem 0' }}>
              <Button
                onClick={() => {
                  history.push('/studentregistration');
                }}
              >
                Register Student
              </Button>
            </p>
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
