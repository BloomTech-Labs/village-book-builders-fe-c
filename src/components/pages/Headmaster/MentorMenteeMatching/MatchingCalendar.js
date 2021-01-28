import { Calendar, Badge, Cascader, Button } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, connect } from 'react';
import MiniMentorList from './MiniMentorList';
import MiniMenteeList from './MiniMenteeList';
import { fetchMentees, fetchMentors } from '../../../../state/actions/index';

// start calendar code
function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'success',
          content: 'Chandler Rosenbaum , Antwan Konopelski, 2pm',
        },
        { type: 'success', content: 'Marilyne Murazik , Michael Scott, 3pm' },
      ];
      break;
    case 18:
      listData = [
        { type: 'success', content: 'Della Walker , Laverna Botsford, 9am' },
        { type: 'success', content: 'Gunnar Johnston , Michael Scott, 10am' },
        {
          type: 'success',
          content: 'Chandler Rosenbaum , Antwan Konopelski, 2pm',
        },
        { type: 'success', content: 'Marilyne Murazik , Michael Scott, 3pm' },
      ];
      break;
    default:
  }
  return listData || [];
}

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
//end calendar code

//start cascader code
const options = [
  {
    value: 'zhejiang',
    label: 'Yo',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

function onChange(value) {
  console.log(value);
}

//end cascader code

const MatchingCalendar = props => {
  // const { fetchMentees } = props;

  // useEffect(() => {
  //   fetchMentees();
  // }, [fetchMentees]);

  return (
    <div>
      <h1>Mentor - Mentee Matching</h1>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />

      <Cascader
        options={options}
        onChange={onChange}
        placeholder="Please select"
      />

      <Button htmlType="submit">Submit</Button>

      <div className="miniListContainer">
        <MiniMentorList />
        <MiniMenteeList />
      </div>
    </div>
  );
};

// const mapStateToProps = state => {
//     return {
//       isloading: state.headmasterReducer.isLoading,
//       mentees: state.headmasterReducer.mentees,
//     };
//   };

export default MatchingCalendar;
