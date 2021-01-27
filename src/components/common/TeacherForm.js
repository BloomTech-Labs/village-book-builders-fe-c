import React from 'react';
import { Form, Input, Button, Checkbox, Divider } from 'antd';

// This reusable component is strictly for the "Teacher" input feilds
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

function TeacherForm() {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log(values);
  };

  return (
    <div>
      <Form
        {...formItemLayout}
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        name="register"
        scrollToFirstError
      >
        <h1>Teacher Registration Form</h1>

        <Form.Item
          name="firstname"
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

        <Form.Item name="education" label="Education">
          <Input />
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
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default TeacherForm;
