import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Form, Input, DatePicker, Space, Radio } from 'antd';
import Moment from 'moment';
import {
  editTeacherProfile,
  fetchTeacherProfile,
} from '../../../state/actions/index';
import {
  layout,
  FormContainer,
  tailLayout,
  Required,
} from '../../common/FormStyle';
import Button from '../../common/Button';
import { debugLog } from '../../../utils/debugMode';
const dateFormat = 'MM/DD/YYYY';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const initialState = {
  first_name: '',
  last_name: '',
  gender: {
    male: '',
    female: '',
    other: '',
  },
  address: '',
  dob: '',
};
const TeacherProfileForm = ({
  fetchTeacherProfile,
  editTeacherProfile,
  teacherProfile,
  isLoading,
}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [value, setValue] = useState(1);
  const params = useParams().id;
  const [form] = Form.useForm();
  useEffect(() => {
    return () => {
      fetchTeacherProfile(0);
      form.setFieldsValue(teacherProfile);
    };
  }, [fetchTeacherProfile]);
  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const handleSubmit = e => {
    editTeacherProfile(params, { ...formValues, gender: value });
  };
  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {!isLoading ? (
        '...loading'
      ) : (
        <FormContainer>
          <Form.Item {...tailLayout}>
            <Link to="/profile">Go Back to your Profile</Link>
          </Form.Item>
          <Form onFinish={handleSubmit} form={form} {...layout}>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[{ required: true, message: 'First Name is required.' }]}
            >
              <Input
                type="text"
                name="first_name"
                defaultValue="Mr Teacher" // Change this
                value={formValues.first_name}
                onChange={e => handleChange(e)}
              />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[{ required: true, message: 'Last Name is required.' }]}
            >
              <Input
                type="text"
                name="last_name"
                value={formValues.last_name}
                onChange={e => handleChange(e)}
              />
            </Form.Item>
            <Space direction="vertical" size={12} {...tailLayout}>
              <DatePicker
                defaultValue={Moment(`${formValues.dob}`, dateFormatList[0])}
                format={dateFormat}
              />
            </Space>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Address is required.' }]}
            >
              <Input
                type="text"
                name="address"
                value={formValues.address}
                onChange={e => handleChange(e)}
              />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Radio.Group onChange={onChange} value={true}>
                <Radio value={'Male'}>Male</Radio>
                <Radio value={'Female'}>Female</Radio>
                <Radio value={'Other'}>Other</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button
                className="l2-btn btn"
                htmlType="submit"
                buttonText="Submit Teacher Edit"
              />
              <Required id="requiredMsg">
                Fields with <span id="required">&#42;</span> are required.
              </Required>
            </Form.Item>
          </Form>
        </FormContainer>
      )}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    teacherProfile: state.teacherReducer.teacherProfile,
    isLoading: state.teacherReducer.isLoading,
  };
};
export default connect(mapStateToProps, {
  editTeacherProfile,
  fetchTeacherProfile,
})(TeacherProfileForm);
