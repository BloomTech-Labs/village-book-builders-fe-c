import React from 'react';
import { Tabs } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import TeacherForm from './TeacherForm';

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
