import React from 'react';
import { Button } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import Libraries from './Libraries';
import EditLibrary from './EditLibrary';
import './AdminDashboard.css';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <h1>Welcome Administrator to your personal dashboard</h1>
      <Link to="/admin/libraries">
        <Button>Libraries </Button>
      </Link>
      <Button> Schools (Future release) </Button>
      <Button> xxxxxx </Button>

      <Switch>
        <Route path="/admin/libraries">
          <Libraries />
        </Route>
        <Route path="/admin/library/edit/:id">
          <EditLibrary />
        </Route>
      </Switch>
    </div>
  );
}
