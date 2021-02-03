import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import StudentProfile from './StudentProfile';
import StudentProfileForm from './StudentProfileForm';
import { fetchMenteeProfile } from '../../../state/actions';
import Logout from '../../Logout.js';
import { Layout, Menu, PageHeader, Button, Avatar } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

const StudentDashboard = props => {
  const { profile } = props;

  useEffect(() => {
    props.fetchMenteeProfile(1); // change this later with login
  }, []);
  console.log(profile);

  const { Content, Sider } = Layout;

  return (
    <div>
      <Layout>
        <Sider
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu mode="inline" defaultSelectedKeys={['4']}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '2rem 1rem',
              }}
            >
              <Avatar style={{ color: '#FF914D' }} icon={<UserOutlined />} />
              <div style={{ padding: '1rem' }}>Welcome</div>
            </div>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <NavLink to="/dashboard">Home</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <NavLink to="/profile">Profile</NavLink>
            </Menu.Item>
            <Menu.Item key="7" icon={<LogoutOutlined />}>
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </Menu>
          <div>
            <img
              style={{ padding: '2rem 1rem' }}
              src="/images/vbb-full-logo.png"
              alt="VBB logo"
              width="150"
            ></img>
          </div>
        </Sider>
        <Layout>
          <PageHeader
            title="Hello"
            extra={[
              <Button key="2" type="primary">
                <a href="/logout">Logout</a>
              </Button>,
            ]}
          ></PageHeader>
          <Content style={{ padding: '2rem', backgroundColor: 'white' }}>
            <Switch>
              <Route exact path="/profile" component={StudentProfile} />
              <Route path="/profile/edit/:id" component={StudentProfileForm} />
              <Route path="/logout" component={Logout} />
            </Switch>
          </Content>
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
    profile: state.menteeReducer.studentProfile,
  };
};

export default connect(mapStateToProps, { fetchMenteeProfile })(
  StudentDashboard
);
