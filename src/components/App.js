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
        <Route path="/admin">
          <AdminDashboard />
        </Route>
        <Route path="/">
          {console.log('loggedin:', loggedIn)}
          {!loggedIn ? (
            <Login />
          ) : (
            //once we make a reusable dashboard/sidebar, this is where we would put it, passing in the role as props to fill it out accordingly
            <HeadmasterDashboard />
          )}
        </Route>
        {/* ! temporary. This will eventually be tied into the reusable dashboard by passing in the admin role in props. Then this will be removed from here. */}
      </Switch>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loginReducer.loggedIn,
    userId: state.loginReducer.userId,
    role: state.loginReducer.role,
  };
};

export default connect(mapStateToProps, {})(App);
