import React from 'react';
import { Button } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import Libraries from './Libraries';
import EditLibrary from './EditLibrary';
import AddLibrary from './AddLibrary';
import './AdminDashboard.css';
import Logout from '../../Logout.js';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <h1>Welcome Administrator to your personal dashboard</h1>
      <Link to="/admin/libraries">
        <Button>Libraries </Button>
      </Link>
      <Button> Schools (Future release) </Button>
      <Link to="/logout">
        <button className="btn l2-btn menuLinks">Logout</button>
      </Link>

      <Switch>
        <Route path="/admin/libraries">
          <Libraries />
        </Route>
        <Route path="/admin/library/add">
          <AddLibrary />
        </Route>
        <Route path="/admin/library/edit/:id">
          <EditLibrary />
        </Route>
        <Route path="/logout" component={Logout} />
      </Switch>
    </div>
  );
}
