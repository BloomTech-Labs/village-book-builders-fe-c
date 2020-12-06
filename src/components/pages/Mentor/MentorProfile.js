import React from 'react';

function MentorProfile() {
  return (
    <div>
      {false && ( //FIXME: get mentor profile information to display here
        <div>
          <br />
          <hr />
          <h2 style={{ color: '#4C4C49' }}>My Info</h2>
          <h3 style={{ color: '#FF914D' }}>Account-Related</h3>
          <p>
            Name (first and last)
            <br />
            Email
            <br />
            Phone Number
            <br />
            Change Password
          </p>
          <h3 style={{ color: '#549BEA' }}>Mentor-Related</h3>
          <p>
            My Languages
            <br />
            My Time Zone
          </p>
          <br />
          <br />
        </div>
      )}
    </div>
  );
}

export default MentorProfile;
