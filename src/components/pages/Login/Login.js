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
import Axios from 'axios';

const initialState = {
  email: '',
  password: '',
};

const Login = props => {
  const [formData, setFormData] = useState(initialState);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    // console.log('LOGIN COMPONENT handleSubmit --> ', formData);
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
          {/* //! REMOVE THESE temp logins for stakehol */}
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
      <h2>Temporary logins:</h2>
      <p>Account info for testing:</p>
      <p>"admin@admin.com" - "password"</p>
      <p>"headmaster@headmaster.com" - "password"</p>
      <p>more from server will be added soon</p>
      <p>
        Note to dev's: highly recommended to save these in your browser
        autocomplete for sanity, until token validation is added to app.js
      </p>
      <p>
        Note to dev's2: need to remove all page refreshes in code. Currently
        causes user to require logging in again.
      </p>
      <h2>Temporary admin dashboard access:</h2>
      <p>Instead of logging in, Add "/admin" after url.</p>
      <p>
        This will be wrapped into the login authorization once some refactoring
        is done, and will match the headmaster dashboard/sidebar design. It's
        seperate in the meantime for functionality testing.{' '}
      </p>
    </FormContainer>
  );
};

export default connect(null, { login })(Login);
