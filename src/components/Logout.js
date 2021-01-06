import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../state/actions/index';

function Logout({ loggedIn, logout }) {
  useEffect(() => {
    if (loggedIn) {
      logout();
    }
  }, [loggedIn, logout]);

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return null;
}

const mapStateToProps = state => {
  return {
    loggedIn: state.authReducer.loggedIn,
  };
};

export default connect(mapStateToProps, { logout })(Logout);
