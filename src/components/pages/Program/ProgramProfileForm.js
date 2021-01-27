import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Form, Input } from 'antd';
import {
  editProgramProfile,
  fetchProgramProfile,
} from '../../../state/actions/index';
import {
  layout,
  FormContainer,
  tailLayout,
  Required,
} from '../../common/FormStyle';
import Button from '../../common/Button';
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

  useEffect(() => {
    return () => {
      fetchProgramProfile(0);
      form.setFieldsValue(programProfile);
    };
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
        <FormContainer>
          <Form.Item {...tailLayout}>
            <Link to="/profile">Go Back to your Profile</Link>
          </Form.Item>
          <Form onFinish={handleSubmit} form={form} {...layout}>
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
    programProfile: state.programReducer.programProfile,
    isLoading: state.programReducer.isLoading,
  };
};
export default connect(mapStateToProps, {
  editProgramProfile,
  fetchProgramProfile,
})(ProgramProfileForm);
