import React from 'react';
import { Tabs } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import StudentForm from './StudentForm';
import TeacherForm from './TeacherForm';
import Login from '../pages/Login/Login';

// This component is where the "Student Form" & "Teacher Form" components are rendered.
const { TabPane } = Tabs;

const TeacherRegForm = () => {
  return (
    <div className="form__body">
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <HomeOutlined />
              Teacher
            </span>
          }
          key="1"
        >
          <TeacherForm className="form__teacher" />
        </TabPane>

        <TabPane
          tab={
            <span>
              <UserOutlined />
              Student
            </span>
          }
          key="2"
        >
          <StudentForm className="form__student" />
        </TabPane>

        <TabPane
          tab={
            <span>
              <UserOutlined />
              Log in
            </span>
          }
          key="3"
        >
          <Login className="form__login" />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TeacherRegForm;
