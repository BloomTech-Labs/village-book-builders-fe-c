import React, { useState, useEffect } from 'react';
import { Table, Form, Input, DatePicker, Radio, Divider } from 'antd';
import { editMenteeProfile } from '../../../../state/actions';
import { debugLog } from '../../../../utils/debugMode';
import { fetchMentors } from '../../../../state/actions/index';

const MenteeFormContent = ({ onChange, fields }) => {
  const [selectionType, setSelectionType] = useState('radio');
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
    },
    {
      title: 'Languages Spoken',
      dataIndex: 'primary_language',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John',
      last_name: 'Smith',
      primary_language: 'English, French, Hindi',
    },
    {
      key: '2',
      name: 'James',
      last_name: 'Roberts',
      primary_language: 'English, Spanish',
    },
    {
      key: '3',
      name: 'Regis',
      last_name: 'Doe',
      primary_language: 'German, English, Japanese',
    },
    {
      key: '4',
      name: 'Tonya',
      last_name: 'Harding',
      primary_language: 'English',
    },
    {
      key: '5',
      name: 'Fred',
      last_name: 'Flintstone',
      primary_language: 'English, French',
    },
    {
      key: '6',
      name: 'Wonder',
      last_name: 'Woman',
      primary_language: 'Amazonian, English',
    },
    {
      key: '7',
      name: 'Rick',
      last_name: 'James',
      primary_language: 'English',
    },
    {
      key: '8',
      name: 'Amy',
      last_name: 'Stone',
      primary_language: 'Spanish',
    },
    {
      key: '9',
      name: 'James',
      last_name: 'Roberts',
      primary_language: 'English, Spanish',
    },
    {
      key: '10',
      name: 'James',
      last_name: 'Roberts',
      primary_language: 'English, Spanish',
    },
    {
      key: '11',
      name: 'John',
      last_name: 'Smith',
      primary_language: 'English, French, Hindi',
    },
    {
      key: '12',
      name: 'Tonya',
      last_name: 'Harding',
      primary_language: 'English',
    },
    {
      key: '13',
      name: 'Fred',
      last_name: 'Flintstone',
      primary_language: 'English, French',
    },
    {
      key: '14',
      name: 'Wonder',
      last_name: 'Woman',
      primary_language: 'Amazonian, English',
    },
    {
      key: '15',
      name: 'Rick',
      last_name: 'James',
      primary_language: 'English',
    },
    {
      key: '16',
      name: 'Amy',
      last_name: 'Stone',
      primary_language: 'Spanish',
    },
    {
      key: '17',
      name: 'James',
      last_name: 'Roberts',
      primary_language: 'English, Spanish',
    },
    {
      key: '18',
      name: 'James',
      last_name: 'Roberts',
      primary_language: 'English, Spanish',
    },
    {
      key: '19',
      name: 'John',
      last_name: 'Smith',
      primary_language: 'English, French, Hindi',
    },
  ];

  return (
    <Form
      name="global_state"
      layout="inline"
      fields={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
    >
      <Form.Item
        label="First Name"
        name="first_name"
        rules={[{ required: true, message: 'First Name is required.' }]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="last_name"
        rules={[{ required: true, message: 'Last Name is required.' }]}
      >
        <Input type="text" />
      </Form.Item>
      {/* <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[{ required: true, message: 'Date of Birth is required.' }]}
        >
          <DatePicker name="dob" onChange={e => onChange(e)} />
        </Form.Item> */}
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Email is required.' }]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="Primary Language"
        name="primary_language"
        rules={[{ required: true, message: 'Primary Language is required.' }]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: 'Gender is required.' }]}
      >
        <Radio.Group name="gender">
          <Radio value={0}>Male</Radio>
          <Radio value={1}>Female</Radio>
          <Radio value={2}>Other</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Picture URL" name="mentee_picture">
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="English Level"
        name="english_lvl"
        rules={[{ required: true, message: 'English level is required.' }]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="Math Level"
        name="math_lvl"
        rules={[{ required: true, message: 'Math level is required.' }]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="Reading Level"
        name="reading_lvl"
        rules={[{ required: true, message: 'Reading level is required.' }]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="School Level"
        name="school_lvl"
        rules={[{ required: true, message: 'School level is required.' }]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="Academic Description"
        name="academic_description"
        rules={[
          {
            required: true,
            message: 'Academic description is required.',
          },
        ]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="Support Needed"
        name="support_needed"
        rules={[
          { required: true, message: 'Support needed level is required.' },
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label="Contact As Early As: "
        name="as_early_as"
        rules={[
          { required: true, message: 'General Availability is required' },
        ]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="Contact As Late As"
        name="as_late_as"
        rules={[
          { required: true, message: 'Goals of mentor program is required.' },
        ]}
      >
        <Input type="text" />
      </Form.Item>

      <Divider />

      <Form.Item label="Choose a Mentor"></Form.Item>
      <Table
        rowSelection={{
          type: selectionType,
        }}
        columns={columns}
        dataSource={data}
      />
    </Form>
  );
};

const MenteeForm = ({ currentMentee, mentors }) => {
  const [fields, setFields] = useState([
    {
      name: ['first_name'],
      value: currentMentee.first_name,
    },
    {
      name: ['last_name'],
      value: currentMentee.last_name,
    },
    {
      name: ['dob'],
      value: currentMentee.dob,
    },
    {
      name: ['email'],
      value: currentMentee.email,
    },
    {
      name: ['primary_language'],
      value: currentMentee.primary_language,
    },
    {
      name: ['gender'],
      value: currentMentee.gender,
    },
    {
      name: ['mentee_picture'],
      value: currentMentee.mentee_picture,
    },
    {
      name: ['english_lvl'],
      value: currentMentee.english_lvl,
    },
    {
      name: ['math_lvl'],
      value: currentMentee.math_lvl,
    },
    {
      name: ['reading_lvl'],
      value: currentMentee.reading_lvl,
    },
    {
      name: ['school_lvl'],
      value: currentMentee.school_lvl,
    },
    {
      name: ['academic_description'],
      value: currentMentee.academic_description,
    },
    {
      name: ['support_needed'],
      value: currentMentee.support_needed,
    },
    {
      name: ['as_early_as'],
      value: currentMentee.availability.as_early_as,
    },
    {
      name: ['as_late_as'],
      value: currentMentee.availability.as_late_as,
    },
    {
      name: ['mentor_advisor'],
      value: currentMentee.mentor_advisor,
    },
  ]);

  return (
    <>
      <MenteeFormContent
        fields={fields}
        onChange={newFields => {
          setFields(newFields);
        }}
      />
    </>
  );
};

export default MenteeForm;
