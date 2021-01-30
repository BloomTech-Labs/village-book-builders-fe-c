import {
  Calendar,
  Badge,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  Space,
  TimePicker,
} from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MiniMentorList from './MiniMentorList';
import MiniMenteeList from './MiniMenteeList';
import { fetchMentees } from '../../../../state/actions/index';
// import Moment from 'moment';
import moment from 'moment';

const initialState = {
  date: '',
  type: 'success',
  content: '',
};

const MatchingCalendar = props => {
  // useEffect will eventually be used to populate list of mentees & mentors in drop menu
  // const { fetchMentees } = props;

  // useEffect(() => {
  //   fetchMentees();
  // }, [fetchMentees]);

  //-----------------------start calendar code - https://ant.design/components/calendar/
  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
  }

  function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          {
            type: 'success',
            content: 'Chandler Rosenbaum & Antwan Konopelski, 2pm',
          },
          { type: 'success', content: 'Marilyne Murazik & Michael Scott, 3pm' },
        ];
        break;
      case 18:
        listData = [
          { type: 'success', content: 'Della Walker & Laverna Botsford, 9am' },
          { type: 'success', content: 'Gunnar Johnston & Michael Scott, 10am' },
          {
            type: 'success',
            content: 'Chandler Rosenbaum & Antwan Konopelski, 2pm',
          },
          { type: 'success', content: 'Marilyne Murazik & Michael Scott, 3pm' },
        ];
        break;
      default:
    }

    return listData || [];
  }
  //-----------------------end calendar code

  //set selection type for standard drop menu in form
  const { Option } = Select;

  const [calValue, setCalValue] = useState(initialState);

  //standard picker handler
  const handleChange = e => {
    setCalValue({ ...calValue, [e.target.name]: e.target.value });
  };

  //date picker handler
  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  const onFinish = calValue => {
    getListData(calValue);
  };

  return (
    <div>
      <h1>Mentor - Mentee Matching</h1>
      <div className="calStyling">
        <Calendar
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
          onPanelChange={onPanelChange}
        />
      </div>
      <h3>Please complete all the fields below to fill a time slot.</h3>
      <Form className="calForm" onFinish={onFinish}>
        <Form.Item label="Mentor">
          <Input.Group large>
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
                <Option value="Mentor Samwise">Mentor Samwise</Option>
                <Option value="Mentor Whistler">Mentor Whistler</Option>
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Mentee">
          <Input.Group large>
            <Form.Item
              name="mentee"
              noStyle
              rules={[{ required: true, message: 'Mentee is required' }]}
            >
              <Select placeholder="Please select a mentee">
                <Option value="Mentee Frodo">Mentee Frodo</Option>
                <Option value="Mentee Blade">Mentee Blade</Option>
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Time slot">
          <Input.Group large>
            <Form.Item
              name="slot"
              noStyle
              rules={[{ required: true, message: 'Time slot is required' }]}
            >
              <Select placeholder="Please select a time slot.">
                <Option value="9am">9am</Option>
                <Option value="10am">10am</Option>
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        {/* <Form.Item label="Date">
          <Input.Group large>
            <Form.Item
              name='date'
              noStyle
              rules={[{ required: true, message: 'Date is required' }]}
              onChange={e => handleChange(e)}
            >
              <Select placeholder="Please select a date."
                name={calValue.date}>
                <Option value={Date()}>1</Option>
                <Option value={2021/1/31}>2</Option>
                <Option value={31}>3</Option>
                <Option value={1/31/2021}>4</Option>
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>  */}

        <Form.Item label="Date">
          <Input.Group large>
            <Form.Item
              name="date"
              noStyle
              // rules={[{ required: true, message: 'Date is required' }]}
              onChange={e => handleChange(e)}
            >
              <Space direction="vertical">
                <DatePicker name={calValue.date} onChange={onChange} />
              </Space>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div className="miniListContainer">
        <MiniMentorList />
        <MiniMenteeList />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isloading: state.headmasterReducer.isLoading,
    mentees: state.headmasterReducer.mentees,
  };
};

export default connect(mapStateToProps, { fetchMentees })(MatchingCalendar);
