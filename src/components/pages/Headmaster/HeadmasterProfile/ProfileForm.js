import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';

import { Form, Input, DatePicker, Space, Radio } from 'antd';
import moment from 'moment';
import { editHeadmasterProfile } from '../../../../state/actions';
import { debugLog } from '../../../../utils/debugMode';
import { Button } from 'antd';

const baseURL = 'https://cors-anywhere.herokuapp.com/http://54.158.134.245/api';

const initialState = {
  first_name: '',
  gender: {
    male: false,
    female: false,
    other: false,
  },
  address: '',
  bio: '',
  communication_app: '',
  dob: '',
  general_availability: '',
  goals_mentor_program: '',
  goals_personal: '',
  goals_school_community: '',
  mentor_advisor_point_of_contact: '',
  phone_number: '',
  photo_url: '',
  programId: '',
  registration_status: '',
  last_name: '',
  time_zone: '',
  villageId: '',
};

const dateFormat = 'MM/DD/YYYY';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const ProfileForm = props => {
  const [formData, setFormData] = useState(initialState);
  const [value, setValue] = useState(1);
  const pathname = useHistory().location.pathname;
  const params = useParams().id;
  const [form] = Form.useForm();

  useEffect(() => {
    axios // ! This should later become available through axiosWithAuth() only once we figure out the Auth with Stakeholder's backend
      .get(`${baseURL}/headmaster/1`)
      .then(res => {
        form.setFieldsValue(res.data);
        setFormData(res.data);
      })
      .catch(err => console.dir(err));
  }, []);

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(formData);
    props.editHeadmasterProfile(params, formData);
  };

  const handleChange = e => {
    debugLog(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <Form>
        <h1 className="page-title">Edit Your Profile</h1>
        <Form.Item>
          <Link to="/profile">Go Back</Link>
        </Form.Item>
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'First Name is required.' }]}
          >
            <Input
              type="text"
              name="first_name"
              defaultValue="Mr Headmaster" // Change this
              value={formData.first_name}
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
              value={formData.last_name}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          {/* <Space direction="vertical" size={12}>
          <DatePicker
            defaultValue={moment(`${formData.dob}`, dateFormatList[0])}
            format={dateFormat}
          />
        </Space> */}

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Address is required.' }]}
          >
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[{ required: true, message: 'Phone Number is required.' }]}
          >
            <Input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item label="Gender" name="gender">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Male</Radio>
              <Radio value={2}>Female</Radio>
              <Radio value={3}>Other</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Bio"
            name="bio"
            rules={[{ required: true, message: 'Bio is required.' }]}
          >
            <Input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="Communication App"
            name="communication_app"
            rules={[
              { required: true, message: 'Communication app is required.' },
            ]}
          >
            <Input
              type="text"
              name="communication_app"
              value={formData.communication_app}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="General Availability"
            name="general_availability"
            rules={[
              { required: true, message: 'General Availability is required' },
            ]}
          >
            <Input
              type="text"
              name="general_availability"
              value={formData.general_availability}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="Mentor Program Goals"
            name="goals_mentor_program"
            rules={[
              {
                required: true,
                message: 'Goals of mentor program is required.',
              },
            ]}
          >
            <Input
              type="text"
              value={formData.goals_mentor_program}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="Personal Goals"
            name="goals_personal"
            rules={[
              { required: true, message: 'Personal goals are required.' },
            ]}
          >
            <Input
              type="text"
              value={formData.goals_personal}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="School Community Goals"
            name="goals_school_community"
            rules={[
              {
                required: true,
                message: 'Goals for schools community are required.',
              },
            ]}
          >
            <Input
              type="text"
              value={formData.goals_school_community}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="Mentor Advisor Point of Contact"
            name="mentor_advisor_point_of_contact"
            rules={[
              {
                required: true,
                message: 'Mentor advisor point of contact is required.',
              },
            ]}
          >
            <Input
              type="text"
              value={formData.mentor_advisor_point_of_contact}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item>
            <p>Fields with * are required.</p>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Form>
    </div>
  );
};

export default connect(null, { editHeadmasterProfile })(ProfileForm);
