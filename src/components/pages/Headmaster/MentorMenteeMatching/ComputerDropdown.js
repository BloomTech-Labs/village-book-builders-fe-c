import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, LaptopOutlined, SyncOutlined } from '@ant-design/icons';

import { changeSelectedComputer } from '../../../../state/actions/index';

const ComputerDropdown = () => {
  const selectedComputerId = useSelector(
    state => state.calendarReducer.selectedComputerId
  );
  const isLoading = useSelector(state => state.calendarReducer.isLoading);
  const dispatch = useDispatch();

  const onClick = ({ key }) => {
    dispatch(changeSelectedComputer(Number(key)));
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">Computer #1</Menu.Item>
      <Menu.Item key="2">Computer #2</Menu.Item>
      <Menu.Item key="3">Computer #3</Menu.Item>
      <Menu.Item key="4">Computer #4</Menu.Item>
      <Menu.Item key="5">Computer #5</Menu.Item>
      <Menu.Item key="6">Computer #6</Menu.Item>
      <Menu.Item key="7">Computer #7</Menu.Item>
      <Menu.Item key="8">Computer #8</Menu.Item>
      <Menu.Item key="9">Computer #9</Menu.Item>
      <Menu.Item key="10">Computer #10</Menu.Item>
      <Menu.Item key="11">Computer #11</Menu.Item>
      <Menu.Item key="12">Computer #12</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu}>
        <Button
          className="ant-dropdown-link"
          style={{ fontSize: '1.1rem' }}
          type="link"
          onClick={e => e.preventDefault()}
        >
          <LaptopOutlined /> Computer #{selectedComputerId} <DownOutlined />
        </Button>
      </Dropdown>
      {isLoading && (
        <SyncOutlined style={{ marginLeft: '1rem', color: 'orange' }} spin />
      )}
    </>
  );
};

export default ComputerDropdown;
