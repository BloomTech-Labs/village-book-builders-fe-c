import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMentees } from '../../../../state/actions/index';
import Moment from 'moment';
import { useHistory } from 'react-router-dom';

const StudentRegistration = props => {
  const [search, setSearch] = useState('');
  const history = useHistory();
  const { fetchMentees } = props;

  const filteredStudents = props.mentees.filter(student => {
    return student.last_name.toLowerCase().includes(search);
  });

  const onSubmit = e => {
    e.preventDefault();
    fetchMentees();
    setSearch('');
  };

  const onChange = e => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          Last Name
          <input
            type="text"
            placeholder="Last Name"
            value={search}
            onChange={onChange}
          />
          <input type="submit" />
        </label>
        <label>
          Date Of Birth
          <input type="date" placeholder="Date Of Birth" />
          <input type="submit" />
        </label>
      </form>
      <div>
        {filteredStudents.length === 0 ? (
          <div>
            <h2>This student is not registered.</h2>
            <button
              onClick={() => {
                history.push('');
              }}
            >
              Register Student
            </button>
          </div>
        ) : (
          filteredStudents.map(student => (
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
              <h3>Date Of Birth:{Moment(student.dob).format('DD-MM-YYYY')}</h3>
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
    mentees: state.headmasterReducer.mentees,
    isLoading: state.headmasterReducer.isLoading,
  };
};

export default connect(mapStateToProps, { fetchMentees })(StudentRegistration);
