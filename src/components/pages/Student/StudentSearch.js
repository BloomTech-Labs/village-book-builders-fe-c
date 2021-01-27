import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  fetchMenteesBySearch,
  fetchMenteesByDateSearch,
} from '../../../state/actions/index';
import Moment from 'moment';
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
    e.preventDefault();
    fetchMenteesByDateSearch(Date.now(dobSearch));
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
      <h1>Search for a student</h1>
      <form onSubmit={onSubmit}>
        <label>
          Last Name
          <input
            type="text"
            placeholder="Last Name"
            value={lastNameSearch}
            onChange={onLastNameChange}
          />
          <input type="submit" />
        </label>
        {/* <label>
          Date Of Birth
          <input type="date" placeholder="Date Of Birth" />
          <input type="submit" />
        </label> */}
      </form>
      <form onSubmit={onDateSubmit}>
        <label>
          Date Of Birth
          <input
            type="date"
            placeholder="Date Of Birth"
            value={dobSearch}
            onChange={onDobChange}
          />
          <input type="submit" />
        </label>
      </form>
      <div>
        {props.searchedMentee.length === 0 ? (
          <div>
            <h2>This student is not registered.</h2>
            <button
              onClick={() => {
                history.push('/register');
              }}
            >
              Register Student
            </button>
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
