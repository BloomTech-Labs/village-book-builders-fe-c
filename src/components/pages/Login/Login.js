import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { login } from '../../../state/actions';

const initialState = {
  email: '',
  password: '',
};

const Login = ({ login, loggedIn }) => {
  const [formData, setFormData] = useState(initialState);
  const [form] = Form.useForm();

  const history = useHistory();

  const handleSubmit = async () => {
    // console.log('LOGIN COMPONENT handleSubmit --> ', formData);
    login(formData);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return loggedIn ? (
    <Redirect to="/dashboard" />
  ) : (
    <div
      style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        form={form}
      >
        <h1>Log In</h1>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email is required.' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
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
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            name="password"
            value={formData.password}
            onChange={e => handleChange(e)}
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log In
          </Button>
        </Form.Item>
        <Form.Item>
          <a className="login-form-register" href="/register">
            Don't have an account?
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.authReducer.loggedIn,
    userId: state.authReducer.userId,
    role: state.authReducer.role,
  };
};

export default connect(mapStateToProps, { login })(Login);
