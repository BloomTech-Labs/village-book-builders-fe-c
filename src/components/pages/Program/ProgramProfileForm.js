import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import {
  editProgramProfile,
  fetchProgramProfile,
} from '../../../state/actions/index';
import { debugLog } from '../../../utils/debugMode';

const initialState = {
  name: '',
  location: '',
  libraryId: '',
};

const ProgramProfileForm = ({
  fetchProgramProfile,
  editProgramProfile,
  programProfile,
  isLoading,
}) => {
  const [formValues, setFormValues] = useState(initialState);
  const params = useParams().id;
  const [form] = Form.useForm();
  const history = useHistory();
  const pathname = useHistory().location.pathname;

  useEffect(() => {
    if (pathname.includes('edit')) {
      fetchProgramProfile(0);
      form.setFieldsValue(programProfile);
      setFormValues(programProfile);
    }
  }, [fetchProgramProfile]);

  const handleSubmit = e => {
    editProgramProfile(params, formValues);
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
        <div className="form-container">
          <Form>
            <h1 className="page-title">Edit Your Profile</h1>
            <Form.Item>
              <Link to="/profile">Go Back</Link>
            </Form.Item>
            <Form onFinish={handleSubmit} form={form}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Name is required.' }]}
              >
                <Input
                  type="text"
                  name="name"
                  defaultValue="program name" // Change this
                  value={formValues.name}
                  onChange={e => handleChange(e)}
                />
              </Form.Item>
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: 'Location is required.' }]}
              >
                <Input
                  type="text"
                  name="location"
                  value={formValues.location}
                  onChange={e => handleChange(e)}
                />
              </Form.Item>
              <Form.Item
                label="Library ID"
                name="libraryId"
                rules={[{ required: true, message: 'Library ID is required.' }]}
              >
                <Input
                  type="text"
                  name="libraryId"
                  value={formValues.libraryId}
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
      )}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    programProfile: state.programReducer.programProfile,
    isLoading: state.programReducer.isLoading,
  };
};
export default connect(mapStateToProps, {
  editProgramProfile,
  fetchProgramProfile,
})(ProgramProfileForm);
