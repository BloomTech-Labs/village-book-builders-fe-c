import React, { useState } from 'react';
import { Button, Divider, Input, List, Avatar } from 'antd';

const MentorList = props => {
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(false);

  const searchHandler = e => setSearch(e.target.value);

  const dummydata = [
    {
      first_name: 'The',
      last_name: 'Dude',
    },
    {
      first_name: 'Wonder',
      last_name: 'Woman',
    },
    {
      first_name: 'Homer',
      last_name: 'Simpson',
    },
    {
      first_name: 'Lady',
      last_name: 'Gaga',
    },
  ];

  return (
    <div className="menteeContainer">
      <h1 id="menteeTittle">Mentor Management</h1>
      <div className="exploreWrapper">
        <Input.Search
          value={search}
          placeholder="Search by Name"
          style={{ width: '80%', alignSelf: 'center' }}
          onChange={searchHandler}
        />
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={dummydata}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={item.first_name + ' ' + item.last_name}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div className="listItemButtonWrapper">
                <Button className="listItemButton" size="middle" type="default">
                  More Info
                </Button>
                <Button
                  className="listItemButton"
                  danger
                  size="middle"
                  type="default"
                >
                  Edit
                </Button>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default MentorList;
