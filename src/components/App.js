import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import '../style.css';
import Login from './pages/Login/Login';
import HeadmasterDashboard from './pages/Headmaster/HeadmasterDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';

const App = ({ loggedIn, userId, role }) => {
  return (
    <div className="App">
      <Switch>
        {/*// ! temporary. This will eventually be tied into the reusable dashboard by passing in the admin role in props. Then this will be removed from here. */}
        <Route path="/admin">
          <AdminDashboard />
        </Route>

        <Route path="/">
          {/* {console.log('loggedin:', loggedIn)} */}
          {/*//! this needs to be changed to if there is an unexpired token
              //! currently must login every page refresh
              //! if it's driving you crazy to resign in until that's fixed,
              //!comment out lines 27, 29, & 31. This will lock login above dashboard
          */}
          {!loggedIn ? (
            <Login />
          ) : (
            //once we make a reusable dashboard/sidebar, this is where we would put it, passing in the role as props to fill it out accordingly
            <HeadmasterDashboard />
          )}
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.authReducer.loggedIn,
    userId: state.authReducer.userId,
    role: state.authReducer.role,
  };
};

export default connect(mapStateToProps, {})(App);
