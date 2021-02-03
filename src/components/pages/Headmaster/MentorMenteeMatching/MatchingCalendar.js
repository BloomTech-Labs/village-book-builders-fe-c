import { Calendar, Badge, Form, Input, DatePicker, Select, Space } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MiniMentorList from './MiniMentorList';
import MiniMenteeList from './MiniMenteeList';
import { fetchCalendar } from '../../../../state/actions/index';
import Moment from 'moment';
import Button from '../../../common/Button';

const initialState = {
  date: '',
  type: 'success',
  content: '',
};

const MatchingCalendar = props => {
  const calState = {
    mentee: props.match.mentee,
    mentor: '',
    time: '',
    date: '',
    id: '',
  };

  const [calendarData, setCalendarData] = useState(calState);
  const { fetchCalendar } = props;
  // console.log("props----------", calendarData)

  useEffect(() => {
    fetchCalendar();
  }, [fetchCalendar]);

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

  function getMonthData(value) {}

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
      //data from match get would go here
      case 1:
        listData = [
          {
            type: 'success',
            content: '',
          },
        ];
        break;
      case 2:
        listData = [
          {
            type: 'success',
            content: 'Mentor Samwise & Mentee Frodo, 2pm',
          },
        ];
        break;
      // case 3:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // case 4:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // case 5:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // case 6:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // case 7:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // case 8:
      //   listData = [
      //     {
      //       type: '',
      //       content: 'Chandler Rosenbaum & Antwan Konopelski, 2pm',
      //     },
      //     { type: '', content: 'Marilyne Murazik & Michael Scott, 3pm' },
      //   ];
      //   break;
      // case 9:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // case 10:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // case 11:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // case 12:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // case 13:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // case 14:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // case 15:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // case 16:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // case 17:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // case 18:
      //   listData = [
      //     { type: 'success', content: 'Della Walker & Laverna Botsford, 9am' },
      //     { type: 'success', content: 'Gunnar Johnston & Michael Scott, 10am' },
      //     {
      //       type: 'success',
      //       content: 'Chandler Rosenbaum & Antwan Konopelski, 2pm',
      //     },
      //     { type: 'success', content: 'Marilyne Murazik & Michael Scott, 3pm' },
      //   ];
      //   break;
      // case 19:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // case 20:
      //   listData = [
      //     {
      //       type: '',
      //       content: '',
      //     },
      //   ];
      //   break;
      // default:
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

  // date picker handler
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
                <Option value="Mentor Samwise">Mentor Samwise</Option>
                <Option value="Mentor Whistler">Mentor Whistler</Option>
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
                <Option value="Mentee Frodo">Mentee Frodo</Option>
                <Option value="Mentee Blade">Mentee Blade</Option>
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
                <Option value={Moment.day(2)}>1</Option>
                <Option value={2021/1/31}>2</Option>
                <Option value={31}>3</Option>
                <Option value={1/31/2021}>4</Option>
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>  */}

        <Form.Item label="Date">
          <Input.Group>
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
          <Button
            className="l2-btn btn"
            htmlType="submit"
            buttonText="Create calendar event"
          />
        </Form.Item>
      </Form>
      {/* <div className="miniListContainer">
        <MiniMentorList />
        <MiniMenteeList />
      </div> */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isloading: state.headmasterReducer.isLoading,
    mentees: state.headmasterReducer.mentees,
    match: state.headmasterReducer.match,
  };
};

export default connect(mapStateToProps, { fetchCalendar })(MatchingCalendar);
