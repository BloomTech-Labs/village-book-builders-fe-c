import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Form, Input } from 'antd';

import { login } from '../../../state/actions';
import {
  layout,
  FormContainer,
  tailLayout,
  Required,
} from '../../common/FormStyle';
import Button from '../../common/Button';

const initialState = {
  email: '',
  password: '',
};

const Login = props => {
  const [formData, setFormData] = useState(initialState);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    console.log('LOGIN COMPONENT handleSubmit --> ', formData);
    props.login(formData);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer>
      <Form onFinish={handleSubmit} form={form} {...layout}>
        <Form.Item {...tailLayout}>
          <h1>Log In</h1>
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email is required.' }]}
        >
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={e => handleChange(e)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Password is required.' }]}
        >
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={e => handleChange(e)}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button buttonText="Log In" type="submit" />
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default connect(null, { login })(Login);
