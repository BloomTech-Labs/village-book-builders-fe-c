import React from 'react';
import { Link } from 'react-router-dom';

function HeadmasterNav() {
  return (
    <div>
      <Link to="/mentor-pairings">Mentor Pairings</Link>
      <Link to="/mentor-advisor">Mentor Advisor</Link>
      <Link to="/school-village">School/Village</Link>
      <Link to="/library">Library</Link>
    </div>
  );
}

export default HeadmasterNav;
