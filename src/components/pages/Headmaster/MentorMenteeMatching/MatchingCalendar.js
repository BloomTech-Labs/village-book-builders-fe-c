import { Calendar, Form, Input, DatePicker, Select, Space, Button } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MiniMentorList from './MiniMentorList';
import MiniMenteeList from './MiniMenteeList';
import MatchingModal from './MatchingModal';
import MatchCell from './MatchCell';
import { fetchCalendar } from '../../../../state/actions/index';

const initialState = {
  date: '',
  type: 'success',
  content: '',
};

const MatchingCalendar = props => {
  const { matches, fetchCalendar } = props;

  useEffect(() => {
    fetchCalendar();
  }, [fetchCalendar]);

  //-----------------------start calendar code - https://ant.design/components/calendar/
  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <div className="scheduleMatch">
        {listData.map(match => (
          <MatchCell key={match.id} match={match} />
        ))}
      </div>
    );
  }

  function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
  }

  function getListData(value) {
    const currentDate = `${value.format('YYYY-MM-DD')}`;
    return matches.filter(m => m.date === currentDate) || [];
  }
  //-----------------------end calendar code

  //set selection type for standard drop menu in form
  const { Option } = Select;

  const [calValue, setCalValue] = useState(initialState);

  const onFinish = () => {};

  //standard picker handler
  const handleChange = e => {
    setCalValue({ ...calValue, [e.target.name]: e.target.value });
  };

  const [clicked, setClicked] = useState(false);
  const [clicked2, setClicked2] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };
  const handleClick2 = () => {
    setClicked2(!clicked2);
  };

  return (
    <div>
      <h1>Mentor - Mentee Matching</h1>
      <div className="calStyling">
        <Calendar
          dateCellRender={dateCellRender}
          onPanelChange={onPanelChange}
        />
      </div>
      <MatchingModal />
      <h3>Please complete all the fields below to fill a time slot.</h3>
      <Form onFinish={onFinish}>
        <Form.Item label="Mentor">
          <Input.Group>
            <Form.Item
              name="content"
              noStyle
              rules={[{ required: true, message: 'Mentor is required' }]}
              onChange={e => handleChange(e)}
            >
              <Select
                placeholder="Please select a Mentor"
                name={calValue.content}
              >
                <Option value="Mentor Michael">Mentor Michael</Option>
                <Option value="Mentor Pam">Mentor Pam</Option>
                <Option value="Mentor Oscar">Mentor Oscar</Option>
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Mentee">
          <Input.Group>
            <Form.Item
              name="mentee"
              noStyle
              rules={[{ required: true, message: 'Mentee is required' }]}
            >
              <Select placeholder="Please select a mentee">
                <Option value="Mentee Scott">Mentee Scott</Option>
                <Option value="Mentee Beasly">Mentee Beasly</Option>
                <Option value="Mentee Martinez">Mentee Martinez</Option>
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item id="form_label" label="Time slot">
          <Input.Group>
            <Form.Item
              name="slot"
              noStyle
              rules={[{ required: true, message: 'Time slot is required' }]}
            >
              <Select placeholder="Please select a time slot.">
                <Option value="9am">9am</Option>
                <Option value="10am">10am</Option>
                <Option value="11am">11am</Option>
                <Option value="12pm">12pm</Option>
                <Option value="1pm">1pm</Option>
                <Option value="2pm">2pm</Option>
                <Option value="3pm">3pm</Option>
                <Option value="4pm">4pm</Option>
                <Option value="5pm">5pm</Option>
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        {/* https://ant.design/components/date-picker/#header
        default onChange
        function onChange(date, dateString) {
          console.log(date, dateString);
        } */}
        <Form.Item label="Date">
          <Input.Group>
            <Form.Item
              name="date"
              noStyle
              // rules={[{ required: true, message: 'Date is required' }]}
              handleChange={e => handleChange(e)}
            >
              <Space direction="vertical">
                <DatePicker name={calValue.date} handleChange={handleChange} />
              </Space>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
      <div className="miniListContainer">
        <div className="listButton1">
          <h1>Mentor List</h1>
          <button onClick={handleClick}>{clicked ? 'Hide' : 'Show'}</button>
          {clicked ? <MiniMentorList /> : null}
        </div>
        <div className="listButton2">
          <h1>Mentee List</h1>
          <button onClick={handleClick2}>{clicked2 ? 'Hide' : 'Show'}</button>
          {clicked2 ? <MiniMenteeList /> : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isloading: state.headmasterReducer.isLoading,
    mentees: state.headmasterReducer.mentees,
    matches: state.headmasterReducer.matches,
  };
};

export default connect(mapStateToProps, { fetchCalendar })(MatchingCalendar);
