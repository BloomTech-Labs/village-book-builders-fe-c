import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSchools } from '../../../state/actions/index';
import School from './School.component';
import { Divider } from 'antd';

const Schools = props => {
  useEffect(() => {
    props.fetchSchools();
  }, []);
  return (
    <div>
      <div />
      <Divider orientation="left">Schools</Divider>
      {props.schools.map(s => (
        <School school={s} />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    schools: state.headmasterReducer.schoolData,
  };
};

export default connect(mapStateToProps, { fetchSchools })(Schools);
