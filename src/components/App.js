import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../state/actions/auth';

// import Landing from './pages/Landing/Landing';
// import Routes from './Routes';
import '../style.css';
import HeadmasterDashboard from './pages/Headmaster/HeadmasterDashboard';
import Login from './pages/Login/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';

const App = ({ loggedIn, userId, role }) => {
  return (
    <div className="App">
      {/* <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/admin">
          <AdminDashboard />
        </Route>
        <Route exact path="/*">
          <HeadmasterDashboard />
        </Route>
      </Switch> */}
      <Route path="/">
        {console.log('loggedin:', loggedIn)}
        {!loggedIn ? (
          <Login />
        ) : (
          //once we make a reusable dashboard/sidebar, this is where we would put it, passing in the role as props to fill it out accordingly
          <HeadmasterDashboard />
        )}
      </Route>
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
// export default App;
