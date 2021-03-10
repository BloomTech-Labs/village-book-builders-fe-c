import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';

// This reusable component is strictly for the "Student" input fields

function StudentForm() {
  const [form] = Form.useForm();

  const history = useHistory();

  const onFinish = values => {
    addStudent(values);
    console.log(values);
    form.resetFields();
    message.success('Student succesfully registered');
  };

  const addStudent = newStudent => {
    axiosWithAuth()
      .post('/mentee', newStudent)
      .then(response => {
        history.push('/');
      })
      .catch(error => alert(error.message));
  };

  return (
    <div className="form-container">
      <Form form={form} onFinish={onFinish} name="register" scrollToFirstError>
        <h1 className="page-title">Student Registration Form</h1> <br></br>
        <Form.Item
          name="firstname"
          label="First Name"
          rules={[
            {
              required: true,
              message: 'Please input your first & last name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
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
        </Form.Item>
        <Form.Item
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
        </Form.Item>
        <Form.Item name="location" label="Location">
          <Input />
        </Form.Item>
        <Form.Item
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
        </Form.Item>
        <Form.Item
          label="Confirm Student Registration"
          name="role"
          value="student"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="checkbox" defaultValue="student" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default StudentForm;
