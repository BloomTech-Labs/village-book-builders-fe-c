import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Radio } from 'antd';
import { editMenteeProfile } from '../../../../state/actions';
import { Required } from '../../../common/FormStyle';
import { debugLog } from '../../../../utils/debugMode';
import MentorDropDownList from '../../Mentor/MentorDropDownList';

const MenteeFormContent = ({ onChange, fields }) => {
  const handleSubmit = async () => {
    debugLog(fields);
    editMenteeProfile(fields);
  };

  return (
    <Form
      name="global_state"
      layout="inline"
      fields={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        id="first_name"
        label="First Name"
        name="first_name"
        rules={[{ required: true, message: 'First Name is required.' }]}
      >
        <Input id="first_name" type="text" name="first_name" />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="last_name"
        rules={[{ required: true, message: 'Last Name is required.' }]}
      >
        <Input type="text" name="last_name" />
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
        rules={[{ required: true, message: 'email is required.' }]}
      >
        <Input type="text" name="email" />
      </Form.Item>

      <Form.Item
        label="Primary Language"
        name="primary_language"
        rules={[{ required: true, message: 'Phone Number is required.' }]}
      >
        <Input type="text" name="primary_language" />
      </Form.Item>

      <Form.Item label="Gender" name="gender">
        <Radio.Group name="gender">
          <Radio value={0}>Male</Radio>
          <Radio value={1}>Female</Radio>
          <Radio value={2}>Other</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Picture URL"
        name="mentee_picture"
        rules={[{ required: true, message: 'Bio is required.' }]}
      >
        <Input type="text" name="mentee_picture" />
      </Form.Item>

      <Form.Item
        label="English Level"
        name="english_lvl"
        rules={[{ required: true, message: 'english level is required.' }]}
      >
        <Input type="text" name="english_lvl" />
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
        rules={[{ required: true, message: 'school level is required.' }]}
      >
        <Input type="text" name="school_lvl" />
      </Form.Item>

      <Form.Item
        label="Academic Description"
        name="academic_description"
        rules={[
          {
            required: true,
            message: 'academic description level is required.',
          },
        ]}
      >
        <Input type="text" name="academic_description" />
      </Form.Item>

      <Form.Item
        label="Support Needed"
        name="support_needed"
        rules={[
          { required: true, message: 'Support needed level is required.' },
        ]}
      >
        <Input type="text" name="support_needed" />
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

      {/* <Form.Item
          label="Personal Goals"
          name="goals_personal"
          rules={[{ required: true, message: 'Personal goals are required.' }]}
        >
          <Input
            type="text"
   
          />
        </Form.Item>

        <Form.Item
          label="School Community Goals"
          name="goals_school_community"
          rules={[
            {
              required: true,
              message: 'Goals for schools community are required.',
            },
          ]}
        >
          <Input type="text"/>
        </Form.Item> */}

      <Form.Item
        label="Mentor Advisor"
        name="mentor_advisor_point_of_contact"
        rules={[
          {
            required: true,
            message: 'Mentor advisor point of contact is required.',
          },
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <MentorDropDownList />
      <Form.Item>
        <Required id="requiredMsg">
          Fields with <span id="required">&#42;</span> are required.
        </Required>
      </Form.Item>
    </Form>
  );
};

const MenteeForm = ({ currentMentee }) => {
  console.log('mentee stuff', currentMentee);
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
      name: ['goals_personal'],
      value: currentMentee.goals_personal,
    },
    {
      name: ['goals_school_community'],
      value: currentMentee.goals_school_community,
    },
    {
      name: ['mentor_advisor_point_of_contact'],
      value: currentMentee.mentor_advisor_point_of_contact,
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
