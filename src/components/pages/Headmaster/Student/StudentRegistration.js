import React, { useState } from 'react';
import { connect } from 'react-redux';

const StudentRegistration = () => {
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
      <div>{/* {
        Something.map((student) => {

        })
      } */}</div>
    </div>
  );
};
const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(StudentRegistration);
