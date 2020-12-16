import React, { useState, useEffect } from 'react';
// import PrivateRoute from '../utils/PrivateRoute';
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Village from '../Village/Village.component.js';
import VillageForm from '../Village/VillageForm.js';
import Schools from '../School/Schools.component.js';
import SchoolForm from '../School/SchoolForm.js';
// import HeadmasterNav from './Drawer';
import TestComponent from './TestComponent';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './HeadmasterDashboard.css';

const menuIcon = {
  position: 'fixed',
  bottom: '0px',
  width: '100%',
  transition: 'all 200ms linear',
};

const menuMove = {
  position: 'fixed',
  bottom: '500px',
  width: '100%',
  transition: 'all 200ms linear',
};

const menuButton = {
  width: '100%',
  backgroundColor: '#549bea',
  border: '1px solid #549bea',
  height: '3rem',
};

function HeadmasterDashboard() {
  const [visible, setVisible] = useState(true);
  const [desktop, setDesktop] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 500) {
      setDesktop(false);
    } else {
      setDesktop(true);
    }
  }, []);

  const onClose = () => {
    setVisible(false);
  };

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 800) {
      setDesktop(false);
      setVisible(false);
    } else {
      setDesktop(true);
      setVisible(true);
    }
  });
  return (
    <div>
      <div className={desktop ? 'headmasterDashboard' : null}>
        <Switch>
          <Route path="/mentor-pairings" component={TestComponent} />
          <Route path="/mentor-advisor" />
          <Route path="/school-village">
            <Village />
            <Schools />
          </Route>
          <Route
            exact
            path="/village/edit/:villageId"
            component={VillageForm}
          />
          <Route exact path="/school/edit/:schoolId" component={SchoolForm} />
          <Route path="/library" />
        </Switch>
      </div>
      {desktop ? null : (
        <div style={visible ? menuMove : menuIcon}>
          <Button
            type="primary"
            style={menuButton}
            onClick={() => setVisible(!visible)}
            icon={<MenuOutlined />}
          >
            Menu
          </Button>
        </div>
      )}
      <div>
        <Drawer
          // title="Menu"
          placement={desktop ? 'left' : 'bottom'}
          closable={false}
          onClose={onClose}
          visible={visible}
          mask={false}
          width={desktop ? 300 : 500}
          height={500}
        >
          <h2>Hello, Headmaster!</h2>

          <NavLink to="/dashboard" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">Home</button>
          </NavLink>
          <NavLink to="/mentor-pairings" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">Mentor Pairings</button>
          </NavLink>
          <NavLink to="/mentor-advisor" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">Mentor Advisor</button>
          </NavLink>
          <NavLink to="/school-village" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">School/Village</button>
          </NavLink>
          <NavLink to="/library" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">Library</button>
          </NavLink>
        </Drawer>

        {/* <HeadmasterNav /> */}
      </div>
    </div>
  );
}

export default HeadmasterDashboard;
