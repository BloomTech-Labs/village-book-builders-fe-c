import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Form, Input, Radio, Button } from 'antd';
import {
  editTeacherProfile as editTeacherProfileAction,
  fetchTeacherProfile as fetchTeacherProfileAction,
} from '../../../state/actions/index';
// import { debugLog } from '../../../utils/debugMode';

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
  fetchTeacherProfileAction: fetchTeacherProfile,
  editTeacherProfileAction: editTeacherProfile,
  teacherProfile,
  isLoading,
}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [value, setValue] = useState(1);
  const params = useParams().id;
  const [form] = Form.useForm();
  const pathname = useHistory().location.pathname;

  useEffect(() => {
    if (pathname.includes('edit')) {
      fetchTeacherProfile(0);
      form.setFieldsValue(teacherProfile);
      setFormValues(teacherProfile);
    }
  }, [fetchTeacherProfile, form, pathname, teacherProfile]);

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
              {/* <Space direction="vertical" size={12}>
              <DatePicker
                defaultValue={Moment(`${formValues.dob}`, dateFormatList[0])}
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
              <Form.Item>
                <p>Fields with * are required.</p>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Form>
        </div>
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
  editTeacherProfileAction,
  fetchTeacherProfileAction,
})(TeacherProfileForm);
