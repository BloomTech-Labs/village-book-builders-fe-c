import React, { useState } from 'react';
import { Form, Input } from 'antd';

const MenteeFormContent = ({ onChange, fields }) => {
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
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Username is required!',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

const MenteeForm = () => {
  const [fields, setFields] = useState([
    {
      name: ['username'],
      value: 'Work damn it!',
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
