import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSchools } from '../../../state/actions/index';
import { StyledSchools } from './School.styles';
import School from './School.component';

const Schools = props => {
  useEffect(() => {
    props.fetchSchools();
  }, []);
  return (
    <StyledSchools>
      <h1>Schools</h1>
      {props.schools.map(s => (
        <School school={s} />
      ))}
    </StyledSchools>
  );
};

const mapStateToProps = state => {
  return {
    schools: state.headmasterReducer.schoolData,
  };
};

export default connect(mapStateToProps, { fetchSchools })(Schools);
