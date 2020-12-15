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

// const baseURL = "http://54.158.134.245/api"

const initialState = {
  username: '',
  password: '',
};

const Login = props => {
  const [formData, setFormData] = useState(initialState);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    console.log('LOGIN COMPONENT handleSubmit --> ', formData);
    props.login();
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
        <Form.Item label="Username" name="username" required>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={e => handleChange(e)}
          />
        </Form.Item>

        <Form.Item label="Password" name="password" required>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={e => handleChange(e)}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button buttonText="Submit" type="submit" />
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default connect(null, { login })(Login);
