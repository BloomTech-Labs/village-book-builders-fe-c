import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import { fetchVillage } from '../../../state/actions/index';

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

const VillageForm = props => {
  const { fetchVillage } = props;
  const [form, setForm] = useState(initialState);
  const history = useHistory();
  const params = useParams().villageId;

  useEffect(() => {
    axios
      .get(`${baseURL}/headmaster/village/${params}`)
      .then(res => {
        console.log('VillageForm', res.data);
        setForm({ ...res.data });
      })
      .catch(err => console.dir(err));
  }, []);

  console.log(form);
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Village Edit form submitted');
    setForm(initialState);
    history.push('/village');
  };

  const handleChange = e => {
    console.log('Village Edit --> ', form);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="headmaster"
        value={'Mr Headmaster'}
        onChange={e => handleChange(e)}
      />
      <input
        type="text"
        name="villageContact"
        value={form.village_contact_name}
        onChange={e => handleChange(e)}
      />
      <input
        type="text"
        name="villagePhone"
        value={form.village_contact_phone}
        onChange={e => handleChange(e)}
      />
      <input
        type="text"
        name="educationContact"
        value={form.education_contact.name}
        onChange={e => handleChange(e)}
      />
      <input
        type="text"
        name="educationPhone"
        value={form.education_contact.phone}
        onChange={e => handleChange(e)}
      />
      <input
        type="email"
        name="educationEmail"
        value={form.education_contact.email}
        onChange={e => handleChange(e)}
      />
      <textarea
        name="notes"
        value={form.notes}
        onChange={e => handleChange(e)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default connect(null, { fetchVillage })(VillageForm);
