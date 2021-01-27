import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Form, Input, DatePicker, Space, Radio } from 'antd';
import Moment from 'moment';
import {
  editMenteeProfile,
  fetchMenteeProfile,
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
  dob: '',
  english_lvl: '',
  math_lvl: '',
  reading_lvl: '',
  school_lvl: '',
  academic_description: '',
};

const StudentProfileForm = ({
  fetchMenteeProfile,
  editMenteeProfile,
  menteeProfile,
  isLoading,
}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [value, setValue] = useState(1);
  const params = useParams().id;
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    return () => {
      fetchMenteeProfile(1);
      form.setFieldsValue(menteeProfile);
    };
  }, [fetchMenteeProfile]);
  console.log('inside mentee profile edit form', menteeProfile);

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    editMenteeProfile(params, { ...formValues, gender: value });
    history.push('/profile');
  };

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {isLoading ? (
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
                defaultValue="Student name" // Change this
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

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email is required.' }]}
            >
              <Input
                type="email"
                name="email"
                value={formValues.email}
                onChange={e => handleChange(e)}
              />
            </Form.Item>
            <Form.Item
              label="Primary Language"
              name="primary_language"
              rules={[
                { required: true, message: 'Primary Language is required.' },
              ]}
            >
              <Input
                type="text"
                name="primary_language"
                value={formValues.primary_language}
                onChange={e => handleChange(e)}
              />
            </Form.Item>
            <Form.Item
              label="English level"
              name="english_lvl"
              rules={[
                { required: true, message: 'English level is required.' },
              ]}
            >
              <Input
                type="integer"
                name="english_lvl"
                value={formValues.english_lvl}
                onChange={e => handleChange(e)}
              />
            </Form.Item>
            <Form.Item
              label="Math level"
              name="math_lvl"
              rules={[{ required: true, message: 'Math level is required.' }]}
            >
              <Input
                type="integer"
                name="math_lvl"
                value={formValues.math_lvl}
                onChange={e => handleChange(e)}
              />
            </Form.Item>
            <Form.Item
              label="Reading level"
              name="reading_lvl"
              rules={[
                { required: true, message: 'Reading level is required.' },
              ]}
            >
              <Input
                type="integer"
                name="reading_lvl"
                value={formValues.reading_lvl}
                onChange={e => handleChange(e)}
              />
            </Form.Item>
            <Form.Item
              label="School level"
              name="school_lvl"
              rules={[{ required: true, message: 'School level is required.' }]}
            >
              <Input
                type="integer"
                name="school_lvl"
                value={formValues.school_lvl}
                onChange={e => handleChange(e)}
              />
            </Form.Item>

            <Form.Item
              label="Academic description"
              name="academic_description"
              rules={[
                {
                  required: true,
                  message: 'Academic description is required.',
                },
              ]}
            >
              <Input
                type="text"
                name="academic_description"
                value={formValues.academic_description}
                onChange={e => handleChange(e)}
              />
            </Form.Item>
            <Form.Item
              label="Support needed"
              name="support_needed"
              rules={[
                { required: true, message: 'Support needed is required.' },
              ]}
            >
              <Input
                type="text"
                name="support_needed"
                value={formValues.support_needed}
                onChange={e => handleChange(e)}
              />
            </Form.Item>
            <Space direction="vertical" size={12} {...tailLayout}>
              <DatePicker
                defaultValue={Moment(`${formValues.dob}`, dateFormatList[0])}
                format={dateFormat}
              />
            </Space>
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
    menteeProfile: state.menteeReducer.menteeProfile,
    isLoading: state.menteeReducer.isLoading,
  };
};
export default connect(mapStateToProps, {
  editMenteeProfile,
  fetchMenteeProfile,
})(StudentProfileForm);
