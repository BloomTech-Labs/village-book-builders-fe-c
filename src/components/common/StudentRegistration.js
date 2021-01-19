import React, { useState } from 'react';
import { connect } from 'react-redux';

const StudentRegistration = () => {
  return (
    <form>
      <label>
        Last Name
        <input type="text" placeholder="Student Search" />
        <input type="submit" />
      </label>
    </form>
  );
};
const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(StudentRegistration);
