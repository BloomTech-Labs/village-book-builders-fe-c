import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import StudentProfileForm from '../../pages/Student/StudentProfileForm';
import StudentForm from '../Student/StudentForm';
import HeadmasterHome from './HeadmasterHome';
import StudentSearch from '../Student/StudentSearch';
import Village from '../Village/Village.component.js';
import VillageForm from '../Village/VillageForm.js';
import Schools from '../School/Schools.component.js';
import SchoolForm from '../School/SchoolForm.js';
import HeadmasterProfile from './HeadmasterProfile/Profile.js';
import ProfileForm from './HeadmasterProfile/ProfileForm.js';
import MentorList from '../Mentor/MentorList.js';
import MatchingCalendar from './MentorMenteeMatching/MatchingCalendar';
import { fetchHeadmasterProfile } from '../../../state/actions';
import Logout from '../../Logout.js';
import Mentees from './Mentees/Mentees.js';
import { Layout, Menu, PageHeader, Button, Avatar } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
  BookOutlined,
  FormOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const HeadmasterDashboard = props => {
  const { profile } = props;

  useEffect(() => {
    props.fetchHeadmasterProfile(1); // change this later with login
  }, []);
  // console.log(profile);

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
              <div style={{ fontSize: '.75rem', padding: '1rem' }}>
                {profile.last_name}
              </div>
            </div>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <NavLink to="/dashboard">Home</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <NavLink to="/profile">Profile</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<CalendarOutlined />}>
              <NavLink to="/mentor-pairings">Mentee List</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<UnorderedListOutlined />}>
              <NavLink to="/mentor-list">Mentor List</NavLink>
            </Menu.Item>
            <Menu.Item key="8" icon={<UnorderedListOutlined />}>
              <NavLink to="/mentor-mentee-matching">
                Mentor Mentee Matching
              </NavLink>
            </Menu.Item>
            <Menu.Item key="5" icon={<BookOutlined />}>
              <NavLink to="/school-village">School/Village</NavLink>
            </Menu.Item>
            <Menu.Item key="6" icon={<FormOutlined />}>
              <NavLink to="/student-search">Student Registration</NavLink>
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
            title={`Hello, Headmaster ${profile.last_name}`}
            extra={[
              <Button key="2" type="primary">
                <a href="/logout">Logout</a>
              </Button>,
            ]}
          ></PageHeader>
          <Content style={{ padding: '2rem', backgroundColor: 'white' }}>
            <Switch>
              <Route path="/dashboard" component={HeadmasterHome} />
              <Route path="/mentor-pairings" component={Mentees} />
              <Route exact path="/profile" component={HeadmasterProfile} />
              <Route path="/profile/edit/:id" component={ProfileForm} />
              <Route
                path="/student/profile/edit/:id"
                component={StudentProfileForm}
              />
              <Route path="/student-search" component={StudentSearch} />
              <Route path="/mentor-list" component={MentorList} />
              <Route path="/studentregistration" component={StudentForm} />
              <Route
                path="/mentor-mentee-matching"
                component={MatchingCalendar}
              />
              <Route path="/school-village">
                <Village />
                <Schools />
              </Route>
              <Route
                exact
                path="/village/edit/:villageId"
                component={VillageForm}
              />
              <Route
                exact
                path="/school/edit/:schoolId"
                component={SchoolForm}
              />
              <Route path="/library" />
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
    profile: state.headmasterReducer.headmasterProfile,
  };
};

export default connect(mapStateToProps, { fetchHeadmasterProfile })(
  HeadmasterDashboard
);
