import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Divider, List, Avatar, Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Moment from 'moment';
import { fetchMentors } from '../../../state/actions/index';

const MentorDropDownList = props => {
  const { fetchMentors } = props;

  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <p>1st menu item</p>
      </Menu.Item>
      <Menu.Item key="1">
        <p>2nd menu item</p>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="0">
        <p>3rd menu item</p>
      </Menu.Item>
      <Menu.Item key="1">
        <p>4th menu item</p>
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Choose Advisor <DownOutlined />
      </Button>
    </Dropdown>
  );
};

const mapStateToProps = state => {
  return {
    isloading: state.headmasterReducer.isLoading,
    mentors: state.headmasterReducer.mentors,
  };
};

export default connect(mapStateToProps, { fetchMentors })(MentorDropDownList);
