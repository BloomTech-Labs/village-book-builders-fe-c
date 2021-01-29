import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import StudentProfile from './StudentProfile';
import { fetchMenteeProfile } from '../../../state/actions';
import StudentProfileForm from './StudentProfileForm';
import Logout from '../../Logout.js';
import { Layout, Menu, PageHeader, Button } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

const StudentDashboard = props => {
  const { profile } = props;

  useEffect(() => {
    props.fetchMenteeProfile(1); // change this later with login
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
            <Menu.Item key="7" icon={<LogoutOutlined />}>
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <PageHeader
            style={{ backgroundColor: '#FF914D' }}
            title={`Hello,`}
            // ${profile.first_name} ${profile.last_name}
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
              <Route exact path="/profile" component={StudentProfile} />
              <Route path="/profile/edit/:id" component={StudentProfileForm} />
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
    profile: state.menteeReducer.studentProfile,
  };
};

export default connect(mapStateToProps, { fetchMenteeProfile })(
  StudentDashboard
);
