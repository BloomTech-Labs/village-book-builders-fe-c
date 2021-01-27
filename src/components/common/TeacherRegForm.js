import React from 'react';
import { Tabs } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import StudentForm from '../pages/Student/StudentForm';
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
      </Tabs>
    </div>
  );
};

export default TeacherRegForm;
