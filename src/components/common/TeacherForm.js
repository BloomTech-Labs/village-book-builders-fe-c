import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

// This reusable component is strictly for the "Teacher" input feilds

const initialFormValues = {
  first_name: '',
  last_name: '',
  gender: '',
  address: '',
};

function TeacherForm() {
  const [form] = Form.useForm();
  //const [formValues, setFormValues] = useState(initialFormValues);
  const [setFormValues] = useState(initialFormValues);

  const history = useHistory();

  const onFinish = values => {
    addTeacher(values);
    console.log(' ON FINISH', values);

    form.resetFields();
    message.success(
      'Thank you for registering, the Headmaster will review your request'
    );
  };

  const addTeacher = newTeacher => {
    axiosWithAuth()
      .post('/teacher', newTeacher)
      .then(response => {
        history.push('/');
      })
      .catch(error => alert(error.message))
      .finally(() => {});
    console.log('.FINALLY --->', newTeacher);
    setFormValues(initialFormValues);
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}
    >
      <Form form={form} onFinish={onFinish} name="register" scrollToFirstError>
        <h1>Teacher Registration Form</h1>

        <Form.Item
          name="first_name"
          label="First Name"
          rules={[
            {
              required: true,
              message: 'First name required',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[
            {
              required: true,
              message: 'Last name required',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: 'Gender required',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Address required',
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item> */}

        {/* <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  'The two passwords that you entered do not match!'
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item> */}

        {/* <Form.Item name="education" label="Education">
          <Input />
        </Form.Item> */}

        {/* <Form.Item name="location" label="Location">
          <Input />
        </Form.Item> */}

        {/* <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            style={{
              width: '100%',
            }}
          />
        </Form.Item> */}
        {/* <Form.Item
          label="Confirm Teacher Registration"
          name="role"
          value="teacher"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="checkbox" defaultValue="teacher" />
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Form.Item>
          <a href="/login">Go Back</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default TeacherForm;
