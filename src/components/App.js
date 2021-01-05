import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import '../style.css';
// import PrivateRoute from "../utils/PrivateRoute";
import Login from './pages/Login/Login';
import HeadmasterDashboard from './pages/Headmaster/HeadmasterDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';

const App = ({ loggedIn, userId, role }) => {
  return (
    <div className="App">
      <Switch>
        {/*// ! temporary. This will eventually be tied into the reusable dashboard by passing in the admin role in props. Then this will be removed from here. */}
        {/* <Route path="/admin">
          <AdminDashboard />
        </Route> */}
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/">
          {/* {console.log('loggedin:', loggedIn)} */}
          {/*//! this needs to be changed to if there is an unexpired token
           */}
          {/* //once we make a reusable dashboard/sidebar, this is where we would put it, passing in the role as props to fill it out accordingly. */}
          {/* {role = "headmaster"} */}
          <br />
          {console.log('role & loggedIn: ', role, loggedIn)}
          role = {role}
          <br />
          token = {localStorage.getItem('token')}
          {localStorage.getItem('token') ? (
            // console.log("yay")
            <HeadmasterDashboard />
          ) : (
            // role === "headmaster" && <HeadmasterDashboard />,
            // role === "admin" && <AdminDashboard />

            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.authReducer.loggedIn,
    // userId: state.authReducer.userId,
    role: state.authReducer.role,
  };
};

export default connect(mapStateToProps, {})(App);
