import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { editSchool } from '../../../state/actions';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';

const baseURL = 'https://cors-anywhere.herokuapp.com/http://54.158.134.245/api';

const initialState = {
  name: '',
  count_students_currently_enrolled: '',
  count_teachers: '',
  id: '',
  notes: '',
  other_dynamic_questions: [],
  school_description: '',
  school_goals: '',
  school_needs: '',
};

const SchoolForm = props => {
  const [formData, setFormData] = useState(initialState);
  const pathname = useHistory().location.pathname;
  const params = useParams().schoolId;
  const [form] = Form.useForm();

  useEffect(() => {
    // Form will populate only if the URL includes "edit"
    if (pathname.includes('edit')) {
      axiosWithAuth()
        .get(`/school/${params}`)
        .then(res => {
          console.log(res);
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
    <div className="form-container">
      <Form>
        <h1 className="page-title">Edit School</h1>
        <Form.Item>
          <Link to="/school-village">Go Back</Link>
        </Form.Item>

        <Form onFinish={handleSubmit} form={form}>
          <Form.Item
            label="Headmaster"
            name="headmaster"
            rules={[
              { required: true, message: 'Headmaster name is required.' },
            ]}
          >
            <Input
              type="text"
              name="headmaster"
              value={formData.headmaster}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="School Description"
            name="school_description"
            rules={[
              { required: true, message: 'School description is required.' },
            ]}
          >
            <Input
              type="text"
              name="school_description"
              value={formData.school_description}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item label="School Goals Description" name="school_goals">
            <Input
              type="text"
              name="school_goals"
              value={formData.school_goals}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item label="School Needs Description" name="school_needs">
            <Input
              type="text"
              name="school_needs"
              value={formData.school_needs}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="Students Currently Enrolled"
            name="count_students_currently_enrolled"
            rules={[{ required: true, message: 'Student count is required.' }]}
          >
            <Input
              type="text"
              name="count_students_currently_enrolled"
              value={formData.count_students_currently_enrolled}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="Teachers Currently Teaching"
            name="count_teachers"
            rules={[{ required: true, message: 'Teacher count is required.' }]}
          >
            <Input
              type="text"
              name="count_teachers"
              value={formData.count_teachers}
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

          <Form.Item>
            <p>Fields with * are required.</p>
            <Button>Submit</Button>
          </Form.Item>
        </Form>
      </Form>
    </div>
  );
};

export default connect(null, { editSchool })(SchoolForm);
