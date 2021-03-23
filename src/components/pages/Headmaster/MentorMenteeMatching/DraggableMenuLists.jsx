import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Draggable } from '@fullcalendar/interaction';
import { Menu } from 'antd';
import {
  fetchMentors,
  fetchMentees,
  showModal,
} from '../../../../state/actions/index';
import {
  CheckSquareTwoTone,
  SelectOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

function DraggableMenuLists() {
  const mentors = useSelector(state => state.headmasterReducer.mentors);
  const mentees = useSelector(state => state.headmasterReducer.mentees);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!mentors || mentors.length === 0) return;
    const draggableItems = document.getElementsByClassName('draggableMentor');
    for (let item of draggableItems) new Draggable(item);
  }, [mentors]);

  useEffect(() => {
    if (!mentees || mentees.length === 0) return;
    const draggableItems = document.getElementsByClassName('draggableMentee');
    for (let item of draggableItems) new Draggable(item);
  }, [mentees]);

  useEffect(() => {
    dispatch(fetchMentors());
    dispatch(fetchMentees());
  }, [dispatch]);

  const openModal = person => {
    dispatch(showModal(person));
  };

  return (
    <Menu
      style={{ width: 300 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['mentors', 'mentees']}
      mode="inline"
    >
      <SubMenu key="mentees" icon={<TeamOutlined />} title="Mentees">
        <Menu.ItemGroup key="mentees-free" title="Not Yet Scheduled">
          {mentees &&
            mentees.map(menteeInfo => (
              <Menu.Item
                className="draggableMentee"
                key={`mentee-${menteeInfo.id}`}
                onClick={() => openModal(menteeInfo)}
                data-event={JSON.stringify({
                  title: 'Session',
                  duration: '01:00',
                  dropping: 'mentee',
                  mentee: [
                    {
                      ...menteeInfo,
                    },
                  ],
                  mentor: [],
                })}
              >
                <SelectOutlined /> {menteeInfo.first_name} (
                {menteeInfo.availability.as_early_as} -{' '}
                {menteeInfo.availability.as_late_as})
              </Menu.Item>
            ))}
        </Menu.ItemGroup>
        <Menu.ItemGroup key="mentees-scheduled" title="Scheduled">
          <Menu.Item key={`mentee-3-set`}>
            <CheckSquareTwoTone /> Mentee 1
          </Menu.Item>
          <Menu.Item key={`mentee-4-set`}>
            <CheckSquareTwoTone /> Mentee 2
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu key="mentors" icon={<UserOutlined />} title="Mentors">
        <Menu.ItemGroup key="mentors-free" title="Not Yet Scheduled">
          {mentors &&
            mentors.map(mentorInfo => (
              <Menu.Item
                className="draggableMentor"
                key={`mentor-${mentorInfo.id}`}
                onClick={() => openModal(mentorInfo)}
                data-event={JSON.stringify({
                  title: 'Session',
                  duration: '01:00',
                  dropping: 'mentor',
                  mentor: [
                    {
                      ...mentorInfo,
                    },
                  ],
                  mentee: [],
                })}
              >
                <SelectOutlined /> {mentorInfo.first_name} (
                {mentorInfo.availability.day}s @ {mentorInfo.availability.time})
              </Menu.Item>
            ))}
        </Menu.ItemGroup>
        <Menu.ItemGroup key="mentors-scheduled" title="Scheduled">
          <Menu.Item key="3">
            <CheckSquareTwoTone /> Mentor 1
          </Menu.Item>
          <Menu.Item key="4">
            <CheckSquareTwoTone /> Mentor 2
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
}

export default DraggableMenuLists;
