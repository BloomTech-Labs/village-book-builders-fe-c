import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  fetchMenteesBySearch as fetchMenteesBySearchAction,
  fetchMenteesByDateSearch as fetchMenteesByDateSearchAction,
} from '../../../state/actions/index';
import Moment from 'moment';
import { Input, Button, Alert, Space, Card, Avatar } from 'antd';
import { useHistory } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';

const StudentSearch = props => {
  const [lastNameSearch, setLastNameSearch] = useState('');
  // const [dobSearch, setDobSearch] = useState('');
  const history = useHistory();

  const { Search } = Input;
  const { Meta } = Card;

  const { fetchMenteesBySearchAction: fetchMenteesBySearch } = props;
  // const { fetchMenteesByDateSearchAction: fetchMenteesByDateSearch } = props;

  const onSubmit = e => {
    console.log(lastNameSearch);
    fetchMenteesBySearch(lastNameSearch);
    setLastNameSearch('');
  };

  // const onDateSubmit = e => {
  //   e.preventDefault();
  //   fetchMenteesByDateSearch(dobSearch);
  //   setDobSearch('');
  // };

  // const onDateSubmit = e => {
  //   /*DOB search currently not working due to JSON server having weird format for dates working on resolving
  //   need to find out how to send
  //   the date back in the same format that we received it*/
  //   e.preventDefault();
  //   fetchMenteesByDateSearch(dobSearch);
  //   setDobSearch('');
  //   console.log(dobSearch);
  // };

  const onLastNameChange = e => {
    setLastNameSearch(e.target.value);
  };

  // const onDobChange = e => {
  //   setDobSearch(e.target.value);
  // };

  return (
    <div className="form-container">
      <div>
        <h1 className="page-title">Find a Student</h1>
        <Space direction="vertical">
          <Search
            style={{ width: 300 }}
            placeholder="Student Last Name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSubmit}
            onChange={onLastNameChange}
          />
        </Space>
        <br></br>
        {/* DOB search currently not working due to JSON server having weird format for dates working on resolving
        <Space direction="vertical">
          <Search
            style={{ width: 300 }}
            placeholder="Student Last Name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onDateSubmit}
            onChange={onDobChange}
          />
        </Space>, */}
        <div>
          {props.isLoading ? (
            ''
          ) : props.searchedMentee.length === 0 ? (
            <div>
              <Alert
                message="This student is not registered."
                type="error"
                showIcon
              />
              <p style={{ padding: '1rem 0' }}>
                <Button
                  onClick={() => {
                    history.push('/studentregistration');
                  }}
                >
                  Register Student
                </Button>
              </p>
            </div>
          ) : (
            props.searchedMentee.map(student => (
              <div>
                <Card
                  style={{ width: 300, padding: '1rem 0' }}
                  cover={<img alt="example" src={student.mentee_picture} />}
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={() =>
                        history.push(`student/profile/edit/${student.id}`)
                      }
                    />,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src={student.mentee_picture} />}
                    title={`${student.first_name} ${student.last_name}`}
                    description={`
                    Date of Birth: ${Moment(student.dob).format('YYYY-MM-DD')}
                    Gender: ${student.gender}
                    Language: ${student.primary_language}
                    `}
                  />
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    searchedMentee: state.menteeReducer.searchedMentee,
    isLoading: state.menteeReducer.isLoading,
  };
};

export default connect(mapStateToProps, {
  fetchMenteesBySearchAction,
  fetchMenteesByDateSearchAction,
})(StudentSearch);
