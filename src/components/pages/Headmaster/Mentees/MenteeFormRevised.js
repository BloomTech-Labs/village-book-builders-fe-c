import React, { useState, useEffect } from 'react';
import { Table, Form, Input, DatePicker, Radio, Divider } from 'antd';
import { editMenteeProfile } from '../../../../state/actions/index.js';
import { fetchMentors } from '../../../../state/actions/index';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../../../style.css';

const MenteeFormRevised = props => {
  const { fetchMentors } = props;
  const history = useHistory();

  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);
  console.log('props-->', props);

  //Defines data for each column in mentor table
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
    },
    {
      title: 'Languages Spoken',
      dataIndex: 'primaryLanguage',
    },
  ];

  const data = props.mentors.map(mentor => {
    return {
      key: mentor.id,
      firstName: mentor.first_name,
      lastName: mentor.last_name,
      primaryLanguage: mentor.primary_language,
    };
  });

  const [fields, setFields] = useState([
    {
      name: ['first_name'],
      value: props.currentMentee.first_name,
    },
    {
      name: ['last_name'],
      value: props.currentMentee.last_name,
    },
    {
      name: ['dob'],
      value: props.currentMentee.dob,
    },
    {
      name: ['email'],
      value: props.currentMentee.email,
    },
    {
      name: ['primary_language'],
      value: props.currentMentee.primary_language,
    },
    {
      name: ['gender'],
      value: props.currentMentee.gender,
    },
    {
      name: ['mentee_picture'],
      value: props.currentMentee.mentee_picture,
    },
    {
      name: ['english_lvl'],
      value: props.currentMentee.english_lvl,
    },
    {
      name: ['math_lvl'],
      value: props.currentMentee.math_lvl,
    },
    {
      name: ['reading_lvl'],
      value: props.currentMentee.reading_lvl,
    },
    {
      name: ['school_lvl'],
      value: props.currentMentee.school_lvl,
    },
    {
      name: ['academic_description'],
      value: props.currentMentee.academic_description,
    },
    {
      name: ['support_needed'],
      value: props.currentMentee.support_needed,
    },
    {
      name: ['as_early_as'],
      value: props.currentMentee.availability.as_early_as,
    },
    {
      name: ['as_late_as'],
      value: props.currentMentee.availability.as_late_as,
    },
    {
      name: ['mentor_advisor'],
      value: 'John',
    },
  ]);

  const handleSubmit = e => {
    editMenteeProfile(fields);
    history.push('/mentor-pairings');
  };

  return (
    <Form
      name="global_state"
      layout="inline"
      fields={fields}
      onFieldsChange={(_, allFields) => {
        setFields(allFields);
      }}
      handleSubmit={handleSubmit}
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
          type: 'radio',
        }}
        columns={columns}
        dataSource={data}
      />
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    isloading: state.headmasterReducer.isLoading,
    mentors: state.headmasterReducer.mentors,
  };
};

export default connect(mapStateToProps, { fetchMentors, editMenteeProfile })(
  MenteeFormRevised
);
