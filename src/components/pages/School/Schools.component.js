import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSchools as fetchSchoolsAction } from '../../../state/actions/index';
import School from './School.component';
import { Divider } from 'antd';

const Schools = props => {
  const { fetchSchoolsAction: fetchSchools, schools } = props;
  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);
  return (
    <div>
      <div />
      <Divider orientation="left">Schools</Divider>
      {schools.map((s, index) => (
        <School school={s} key={index} />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    schools: state.headmasterReducer.schoolData,
  };
};

export default connect(mapStateToProps, { fetchSchoolsAction })(Schools);
