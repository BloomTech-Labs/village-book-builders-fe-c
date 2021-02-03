import {
  Calendar,
  Badge,
  Form,
  Input,
  DatePicker,
  Select,
  Space,
  Button,
} from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MiniMentorList from './MiniMentorList';
import MiniMenteeList from './MiniMenteeList';
import { fetchCalendar } from '../../../../state/actions/index';

const initialState = {
  date: '',
  type: 'success',
  content: '',
};

const MatchingCalendar = props => {
  const { fetchCalendar } = props;

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
      //this is how to apply props to calendar data - will need to passed through in function from the form in future builds.
      //Per TPL here is where to start.
      //So here's some example code:
      // for (elem of props.match) {
      //   let appt = {
      //     type: 'success'
      //   }
      //   appt.content = `${elem.mentee} & ${elem.mentor}, ${elem.time}`
      //   appt.date = elem.date.slice('/')[2]
      //   console.log(appt)
      // }
      // that can pull from those props and turn them into appt objects that fit your format;
      // what you would need to do is figure out how to got them into that function such that
      // the appt.date files them into the appropriate switch statement

      // That slice() function is just grabbing the data from that string as the relevant single number,
      // you'd want to make sure to convert it to an int if necessary

      //It might mean having different variables in each of those switch statements rather than using
      // listData every time, but depends how you set it up I suppose.
      case 1:
        listData = [
          {
            type: 'success',
            content: `Mentor ${props.match[0]['mentee']} & Mentee ${props.match[0]['mentor']} @ ${props.match[0]['time']}`,
          },
        ];
        break;
      case 5:
        listData = [
          {
            type: 'success',
            content: `Mentor ${props.match[0]['mentee']} & Mentee ${props.match[0]['mentor']} @ ${props.match[0]['time']}`,
          },
        ];
        break;
      case 11:
        listData = [
          {
            type: 'success',
            content: `Mentor ${props.match[0]['mentee']} & Mentee ${props.match[0]['mentor']} @ ${props.match[0]['time']}`,
          },
        ];
        break;
      case 16:
        listData = [
          {
            type: 'success',
            content: `Mentor ${props.match[0]['mentee']} & Mentee ${props.match[0]['mentor']} @ ${props.match[0]['time']}`,
          },
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

  const onFinish = calValue => {
    console.log(calValue);
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
    match: state.headmasterReducer.match,
  };
};

export default connect(mapStateToProps, { fetchCalendar })(MatchingCalendar);
