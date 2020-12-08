import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import Booking from './pages/Booking/Booking';
import Dashboard from './pages/Dashboard/Dashboard';
import MasterForm from './pages/Registration/MasterForm';
import HomeSignIn from './pages/HomeSignIn/HomeSignIn';
import SessionDetails from './pages/SessionDetails/SessionDetails';
import adminDashboard from './pages/Admin/AdminDashboard';
import adminLibraries from './pages/Admin/AdminLibraries';
// import Donation from "./registration/Donation"

function Routes() {
  return (
    <div>
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute exact path="/booking/" component={Booking} />
      <PrivateRoute exact path="/admin/" component={adminDashboard} />
      <PrivateRoute exact path="/admin/libraries" component={adminLibraries} />
      <Route exact path="/signin/" component={HomeSignIn} />
      <Route exact path="/signup/" component={MasterForm} />
      <Route
        exact
        path="/sessiondetails/:sessionid/"
        component={SessionDetails}
      />
      {/* <Route exact path="/donate/" component={Donation} /> */}
    </div>
  );
}

export default Routes;
