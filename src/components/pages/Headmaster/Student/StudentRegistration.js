import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMentees } from '../../../../state/actions/index';

const StudentRegistration = props => {
  const { fetchMentees } = props;
  useEffect(() => {
    fetchMentees();
  }, [fetchMentees]);
  console.log(props.mentees);

  return (
    <div>
      <form>
        <label>
          Last Name
          <input type="text" placeholder="Last Name" />
          <input type="submit" />
        </label>
        <label>
          Date Of Birth
          <input type="date" placeholder="Date Of Birth" />
          <input type="submit" />
        </label>
      </form>
      <div>
        {props.isLoading
          ? '...Loading'
          : props.mentees.map(student => (
              <div>
                <h2>{student.mentee_picture}</h2>
                <h2>
                  {student.first_name} {student.last_name}
                </h2>
                <h2>{student.gender}</h2>
                <h2>{student.primary_language}</h2>
                <h2>{student.dob}</h2>
              </div>
            ))}
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
