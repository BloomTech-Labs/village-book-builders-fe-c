import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Link,
  NavLink,
  // Redirect,
  // BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import ProgramProfile from './ProgramProfile';
import ProgramProfileForm from './ProgramProfileForm';
import StudentSearch from '../Student/StudentSearch';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import '../../../styles/Dashboard.css';
import {
  menuButton,
  menuIcon,
  menuMove,
  Dashboard,
} from '../../../styles/Dashboard.style';
import Logout from '../../Logout.js';

function ProgramDashboard() {
  const [visible, setVisible] = useState(true);
  const [desktop, setDesktop] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 800 || document.documentElement.width <= 800) {
      setDesktop(false);
      setVisible(false);
    } else {
      setDesktop(true);
    }
  }, []);

  const onClose = () => {
    setVisible(false);
  };

  // Todo: this needs to be converted to a mediaquery and removed from here
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 800 || document.documentElement.width <= 800) {
      setDesktop(false);
      setVisible(false);
    } else {
      setDesktop(true);
      setVisible(true);
    }
  });

  return (
    <div>
      {/* <Dashboard> */}
      <Switch>
        <Route exact path="/profile" component={ProgramProfile} />
        <Route path="/profile/edit/:id" component={ProgramProfileForm} />
        {/* <Route path="/student-registration" component={StudentRegistration} /> */}
        <Route path="/logout" component={Logout} />
      </Switch>
      {/* </Dashboard> */}

      {desktop ? null : (
        // inline style to force animation
        <div style={visible ? menuMove : menuIcon}>
          <Button
            type="primary"
            style={menuButton} // inline style to override Ant Design
            onClick={() => setVisible(!visible)}
            icon={<MenuOutlined />}
          >
            Menu
          </Button>
        </div>
      )}
      <div>
        <Drawer
          placement={desktop ? 'left' : 'bottom'}
          closable={false}
          onClose={onClose}
          visible={visible}
          mask={false}
          width={desktop ? 300 : 500}
          height={500}
        >
          <h2>Hello, Program!</h2>

          <NavLink to="/dashboard" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">Home</button>
          </NavLink>
          <NavLink to="/profile" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">Profile</button>
          </NavLink>
          <NavLink to="/student-registration" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">
              Student Registration
            </button>
          </NavLink>
          <Link to="/logout" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">Logout</button>
          </Link>
        </Drawer>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.authReducer.loggedIn,
    // userId: state.authReducer.userId,
    // role: state.authReducer.role,
  };
};

export default connect(mapStateToProps, {})(ProgramDashboard);
