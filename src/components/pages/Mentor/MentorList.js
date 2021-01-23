import React, { useState, useEffect } from 'react';
import { Divider, List, Avatar } from 'antd';
import axios from 'axios';

const MentorList = props => {
  const [data, setData] = useState([]);

  const axiosWithAuth = () => {
    const token = window.localStorage.getItem('token');
    return axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        Authorization: token,
      },
    });
  };

  const fetchMentors = () => {
    axiosWithAuth()
      .get(`https://vbb-mock-api.herokuapp.com/mentor`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {});
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  return (
    <div className="menteeContainer">
      <h1 id="menteeTittle">Mentor Advisors</h1>
      <div className="exploreWrapper">
        <Divider />
        <List
          itemLayout="vertical"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.mentor_picture} />}
                title={item.first_name + ' ' + item.last_name}
              />
              <List.Item.Meta
                title={<header>Academic Background</header>}
                description={item.academic_description}
              />
              <List.Item.Meta
                title={<header>Email Address</header>}
                description={item.email}
              />
              <List.Item.Meta
                title={<header>Contact As Early As</header>}
                description={item.availability.as_early_as}
              />
              <List.Item.Meta
                title={<header>Contact As Late As</header>}
                description={item.availability.as_late_as}
              />
              <List.Item.Meta
                title={<header>Contact Methods</header>}
                description={item.availability.methods}
              />
              <List.Item.Meta
                title={<header>Time Zone</header>}
                description={item.availability.time_zone}
              />
              <List.Item.Meta
                title={<header>DOB</header>}
                description={item.dob}
              />
              <List.Item.Meta
                title={<header>Primary Language</header>}
                description={item.primary_language}
              />
            </List.Item>
          )}
        />
        <Divider />
      </div>
    </div>
  );
};

export default MentorList;
