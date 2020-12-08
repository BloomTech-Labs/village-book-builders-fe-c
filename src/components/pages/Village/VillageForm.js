import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const initialState = {
  headmaster: '',
  villageContact: '',
  villagePhone: '',
  educationContact: '',
  educationPhone: '',
  educationEmail: '',
  notes: '',
};

const dummyData = {
  id: 123,
  headmaster: 'John Doe',
  villageContact: 'Jane Doe',
  villagePhone: '123-234-3456',
  educationContact: 'James Doe',
  educationPhone: '444-234-2342',
  educationEmail: 'email@example.com',
  notes: 'Lorem ipsum dolor sit am',
};

const VillageForm = () => {
  const [form, setForm] = useState(dummyData);
  const history = useHistory();

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
        value={form.headmaster}
        onChange={e => handleChange(e)}
      />
      <input
        type="text"
        name="villageContact"
        value={form.villageContact}
        onChange={e => handleChange(e)}
      />
      <input
        type="text"
        name="villagePhone"
        value={form.villagePhone}
        onChange={e => handleChange(e)}
      />
      <input
        type="text"
        name="educationContact"
        value={form.educationContact}
        onChange={e => handleChange(e)}
      />
      <input
        type="text"
        name="educationPhone"
        value={form.educationPhone}
        onChange={e => handleChange(e)}
      />
      <input
        type="email"
        name="educationEmail"
        value={form.educationEmail}
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

export default VillageForm;
