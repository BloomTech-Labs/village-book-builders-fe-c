import React from 'react';
import { Button } from 'antd';
import { useHistory, Link, Route, Switch } from 'react-router-dom';
import Libraries from './Libraries';
import EditLibrary from './EditLibrary';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { push } = useHistory();

  return (
    <div className="admin-dashboard-container">
      <h1>Welcome Administrator to your personal dashboard</h1>
      {/* TODO: pushing to a new route works for mobile first, but may need to be modified for better browser designs */}
      <Link to="/admin/libraries">
        <Button>Libraries </Button>
      </Link>
      <Button> Schools </Button>
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
