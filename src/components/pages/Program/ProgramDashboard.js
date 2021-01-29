import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import ProgramHome from '../Program/ProgramHome';
import StudentSearch from '../Student/StudentSearch';
import ProgramProfile from './ProgramProfile';
import { fetchProgramProfile } from '../../../state/actions';
import ProfileForm from './ProgramProfileForm';
import Logout from '../../Logout.js';
import { Layout, Menu, PageHeader, Button } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  FormOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const ProgramDashboard = props => {
  const { profile } = props;

  useEffect(() => {
    props.fetchProgramProfile(1); // change this later with login
  }, []);
  console.log(profile);

  const { Content, Footer, Sider } = Layout;

  return (
    <div>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu style={{ backgroundColor: '#FFFFF6' }}>
            <div style={{ padding: '1rem' }}>
              <img
                src="/images/vbb-full-logo.png"
                alt="VBB logo"
                width="150"
              ></img>
            </div>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <NavLink to="/dashboard">Home</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <NavLink to="/profile">Profile</NavLink>
            </Menu.Item>
            <Menu.Item key="6" icon={<FormOutlined />}>
              <NavLink to="/student-search">Student Registration</NavLink>
            </Menu.Item>
            <Menu.Item key="7" icon={<LogoutOutlined />}>
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <PageHeader
            style={{ backgroundColor: '#FF914D' }}
            title={`Hello, ${profile.name}`}
            extra={[
              <Button key="1">
                <a href="#">Go Back</a>
              </Button>,
              <Button key="2" type="primary">
                <a href="/logout">Logout</a>
              </Button>,
            ]}
          ></PageHeader>
          <Content style={{ padding: '5rem', backgroundColor: '#FFFFF6' }}>
            <Switch>
              <Route path="/dashboard" component={ProgramHome} />
              <Route exact path="/profile" component={ProgramProfile} />
              <Route path="/profile/edit/:id" component={ProfileForm} />
              <Route path="/student-search" component={StudentSearch} />
              <Route path="/logout" component={Logout} />
            </Switch>
          </Content>
          <Footer style={{ backgroundColor: '#FF914D' }}>
            <h2
              style={{ textAlign: 'left', fontSize: '.75rem', color: 'white' }}
            >
              Village Book Builders
            </h2>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.authReducer.loggedIn,
    userId: state.authReducer.userId,
    role: state.authReducer.role,
    profile: state.programReducer.programProfile,
  };
};

export default connect(mapStateToProps, { fetchProgramProfile })(
  ProgramDashboard
);
