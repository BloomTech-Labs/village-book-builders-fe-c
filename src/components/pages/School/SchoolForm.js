import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';

import { Form, Input } from 'antd';

import { editSchool } from '../../../state/actions';
import {
  layout,
  FormContainer,
  tailLayout,
  Required,
} from '../../common/FormStyle';
import Button from '../../common/Button';

const baseURL = 'http://54.158.134.245/api';

const initialState = {
  headmaster: 'Mr Headmaster',
  village_contact_name: '',
  village_contact_phone: '',
  education_contact: {
    name: '',
    phone: '',
    email: '',
  },
  notes: '',
};

const SchoolForm = props => {
  const [formData, setFormData] = useState(initialState);
  const pathname = useHistory().location.pathname;
  const params = useParams().schoolId;
  const [form] = Form.useForm();

  useEffect(() => {
    // Form will populate only if the URL includes "edit"
    if (pathname.includes('edit')) {
      axios // ! This should later become available through axiosWithAuth() only once we figure out the Auth with Stakeholder's backend
        .get(`${baseURL}/headmaster/village/${params}`)
        .then(res => {
          const data = res.data;
          form.setFieldsValue(data);
          setFormData(data);
        })
        .catch(err => console.dir(err));
    }
  }, []);

  const handleSubmit = async () => {
    props.editSchool(params, formData);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer>
      <Form.Item {...tailLayout}>
        <Link to="/school-village">Go Back to School Profile</Link>
      </Form.Item>
      <Form onFinish={handleSubmit} form={form} {...layout}>
        <Form.Item label="Headmaster" name="headmaster" required>
          <Input
            type="text"
            name="headmaster"
            defaultValue="Mr Headmaster"
            value={formData.headmaster}
            onChange={e => handleChange(e)}
          />
        </Form.Item>

        <Form.Item
          label="Village Contact Name"
          name="village_contact_name"
          required
        >
          <Input
            type="text"
            name="village_contact_name"
            value={formData.village_contact_name.value}
            onChange={e => handleChange(e)}
          />
        </Form.Item>

        <Form.Item label="Village Contact Phone" name="village_contact_phone">
          <Input
            type="text"
            value={formData.village_contact_phone}
            onChange={e => handleChange(e)}
          />
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <Input.TextArea
            name="notes"
            value={formData.notes}
            onChange={e => handleChange(e)}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            className="l2-btn btn"
            htmlType="submit"
            buttonText="Submit School Edit"
          />
          <Required id="requiredMsg">
            Fields with <span id="required">&#42;</span> are required.
          </Required>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default connect(null, { editSchool })(SchoolForm);
