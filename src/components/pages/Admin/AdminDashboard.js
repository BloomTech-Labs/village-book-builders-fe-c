import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

export default function AdminDashboard() {
  const { push } = useHistory();

  return (
    <>
      <h1>Welcome Administrator to your personal dashboard</h1>
      {/* TODO: pushing to a new route works for mobile first, but may need to be modified for better browser designs */}
      <Button onClick={() => push('admin/libraries')}> Libraries </Button>
      <Button> Schools </Button>
      <Button> xxxxxx </Button>
    </>
  );
}
