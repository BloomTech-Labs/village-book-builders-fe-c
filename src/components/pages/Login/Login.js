import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Form, Input } from 'antd';
import { login } from '../../../state/actions';
import {
  layout,
  FormContainer,
  tailLayout,
  // Required,
} from '../../common/FormStyle';
import Button from '../../common/Button';

const initialState = {
  email: '',
  password: '',
};

const Login = ({ login, loggedIn }) => {
  const [formData, setFormData] = useState(initialState);
  const [form] = Form.useForm();

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
    <FormContainer>
      <Form onFinish={handleSubmit} form={form} {...layout}>
        <Form.Item {...tailLayout}>
          <h1>Log In</h1>
          {/* //! REMOVE THESE temp logins for stakeholder */}
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
      <p>"teacher@teacher.com" - "password"</p>
      <p>"program@program.com" - "password"</p>
      <p>"mentees@mentees.com" - "password"</p>

      <p>
        Note to dev's: need to remove all page refreshes in code.
        `window.location.replace()` refreshes the page, clears out the redux
        store, and slows down functionality. `history.push` and `Redirect` are
        better for react SPA's
      </p>
    </FormContainer>
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
