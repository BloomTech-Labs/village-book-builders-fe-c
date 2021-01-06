import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../../utils/axiosWithAuth';
import { Button, Divider, Input, Modal, List, Avatar } from 'antd';
import { connect } from 'react-redux';
import { checkToken, fetchMentees } from '../../../../state/actions/index';

const Mentees = props => {
  let menteesSelection = [...props.mentees];
  const [search, setSearch] = useState('');

  const searchHandler = e => {
    setSearch(e.target.value);
    // console.log(e.target.value);
  };
  if (Array.isArray(menteesSelection)) {
    menteesSelection = menteesSelection.filter(
      item =>
        item.first_name.toLowerCase().includes(search.toLowerCase()) ||
        item.last_name.toLowerCase().includes(search.toLowerCase())
    );
  }

  useEffect(() => {
    props.fetchMentees();
  }, []);

  return (
    <div className="menteeContainer">
      <h1 id="menteeTitle">Mentee Management</h1>
      <div className="exploreWrapper">
        <Button
          style={{ width: '80%', marginBottom: '10pt', alignSelf: 'center' }}
          align="center"
        >
          Create New Library
        </Button>
        <Input.Search
          value={search}
          placeholder="Search by Name"
          style={{ width: '80%', alignSelf: 'center' }}
          onChange={searchHandler}
        />
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={menteesSelection}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.mentee_picture} />}
                title={
                  <a href="https://ant.design">
                    {item.first_name + ' ' + item.last_name}
                  </a>
                }
                description={item.academic_description}
              />
            </List.Item>
          )}
        />
        ,
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state.headmasterReducer.mentees);

  return {
    mentees: state.headmasterReducer.mentees,
    // userId: state.loginReducer.userId,
    // role: state.loginReducer.role,
  };
};

export default connect(mapStateToProps, { checkToken, fetchMentees })(Mentees);
