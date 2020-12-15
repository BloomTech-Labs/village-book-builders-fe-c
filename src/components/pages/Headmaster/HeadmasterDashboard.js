import React, { useState, useEffect } from 'react';
// import PrivateRoute from '../utils/PrivateRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TestComponent from './TestComponent';
// import HeadmasterNav from './Drawer';
import { Drawer, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import './HeadmasterDashboard.css';

const animate = {
  paddingLeft: '20rem',
  transition: 'all 200ms linear',
};

const closeAnimate = {
  paddingLeft: '2rem',
  transition: 'all 200ms linear',
};

// const menuLinks = {
//     border: '1px solid #ff914d',
//     // backgroundColor: "#ff914d",
//     // height: '3rem',
//     width: '100%',
//     color: "white"
//     // textAlign: "center",
// }

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
  // add calendar here
  // change routes to privateRoutes

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
    if (window.innerWidth <= 500) {
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
        <h1>Hello, Headmaster!</h1>
        <Switch>
          <Route path="/mentor-pairings" component={TestComponent} />
          <Route path="/mentor-advisor" />
          <Route path="/school-village" />
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
          title="Menu"
          placement={desktop ? 'left' : 'bottom'}
          closable={desktop ? false : true}
          onClose={onClose}
          visible={visible}
          mask={false}
          width={desktop ? 300 : 500}
          height={500}
        >
          <button className="btn l2-btn menuLinks">
            <NavLink to="/" onClick={() => setVisible(true)}>
              Home
            </NavLink>
          </button>
          <button className="btn l2-btn menuLinks">
            <NavLink to="/mentor-pairings" onClick={() => setVisible(true)}>
              Mentor Pairings
            </NavLink>
          </button>
          <button className="btn l2-btn menuLinks">
            <NavLink to="/mentor-advisor" onClick={() => setVisible(true)}>
              Mentor Advisor
            </NavLink>
          </button>
          <button className="btn l2-btn menuLinks">
            <NavLink to="/school-village" onClick={() => setVisible(true)}>
              School/Village
            </NavLink>
          </button>
          <button className="btn l2-btn menuLinks">
            <NavLink to="/library" onClick={() => setVisible(true)}>
              Library
            </NavLink>
          </button>
        </Drawer>

        {/* <HeadmasterNav /> */}
      </div>
    </div>
  );
}

export default HeadmasterDashboard;
