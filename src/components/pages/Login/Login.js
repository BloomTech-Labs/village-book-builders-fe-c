import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Form, Input, Checkbox, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { login } from '../../../state/actions';

const initialState = {
  email: '',
  password: '',
};

const Login = props => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.authReducer.loggedIn);
  const errors = useSelector(state => state.authReducer.errors);
  const isLoading = useSelector(state => state.authReducer.isLoading);
  const [formData, setFormData] = useState(initialState);
  const [form] = Form.useForm();

  //const history = useHistory();

  const handleSubmit = async () => {
    dispatch(login(formData));
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (errors.message) message.error(errors.message);
  }, [errors]);

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

          <Button type="link" className="login-form-forgot">
            Forgot password
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLoading}
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

export default Login;
