import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import { Form, Input, Button } from 'antd';

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

const VillageForm = () => {
  const [formData, setFormData] = useState(initialState);

  const history = useHistory();
  const params = useParams().villageId;

  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get(`${baseURL}/headmaster/village/${params}`)
      .then(res => {
        console.log('VillageForm', res.data);
        form.setFieldsValue({
          ...res.data,
          education_contact_name: res.data.education_contact.name,
          education_contact_phone: res.data.education_contact.phone,
          education_contact_email: res.data.education_contact.email,
        });
        setFormData({
          ...res.data,
        });
      })
      .catch(err => console.dir(err));
  }, []);

  const handleSubmit = e => {
    // e.preventDefault()
    console.log('Village Edit form submitted', formData);
    setFormData(initialState);
    history.push('/village');
  };

  const handleChange = e => {
    console.log('Village Edit --> ', formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Form onFinish={handleSubmit} initialvalue={formData} form={form}>
      <Form.Item label="Headmaster" name="headmaster">
        <Input
          type="text"
          // id="headmaster"
          name="headmaster"
          // defaultValue="Mr Headmaster"
          value={formData.headmaster}
          onChange={e => handleChange(e)}
        />
      </Form.Item>

      <Form.Item label="Village Contact Name" name="village_contact_name">
        <Input
          type="text"
          // id="village_contact_name"
          name="village_contact_name"
          value={formData.village_contact_name.value}
          onChange={e => handleChange(e)}
        />
      </Form.Item>

      <Form.Item label="Village Contact Phone" name="village_contact_phone">
        <Input
          type="text"
          // name="village_contact_phone"
          value={formData.village_contact_phone}
          onChange={e => handleChange(e)}
        />
      </Form.Item>

      <Form.Item label="Education Contact Name" name="education_contact_name">
        <Input
          type="text"
          // name="education_contact.name"
          value={formData.education_contact.name}
          onChange={e => handleChange(e)}
        />
      </Form.Item>

      <Form.Item label="Education Contact Phone" name="education_contact_phone">
        <Input
          type="text"
          // name="education_contact.phone"
          value={formData.education_contact.phone}
          onChange={e => handleChange(e)}
        />
      </Form.Item>

      <Form.Item label="Education Contact Email" name="education_contact_email">
        <Input
          type="email"
          // name="education_contact.email"
          value={formData.education_contact.email}
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
      <input type="submit" value="Submit Edit" />
    </Form>
  );
};

export default connect(null, {})(VillageForm);
