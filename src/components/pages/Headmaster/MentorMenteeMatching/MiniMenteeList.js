import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Divider, List, Avatar } from 'antd';
import { fetchMentees } from '../../../../state/actions/index';

const MiniMenteeList = props => {
  const { fetchMentees } = props;

  useEffect(() => {
    fetchMentees();
  }, [fetchMentees]);

  return (
    <div className="miniList">
      <h2>Mentee List</h2>
      <div>
        <Divider />
        <List
          itemLayout="vertical"
          dataSource={props.mentees}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.mentor_picture} />}
                title={item.first_name + ' ' + item.last_name}
              />
              {/* <List.Item.Meta
                title={<header>Email Address</header>}
                description={item.email}
              /> */}
              {/* <List.Item.Meta
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
                description={Moment(item.dob).format('DD-MM-YYYY')}
              /> */}
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

const mapStateToProps = state => {
  return {
    isloading: state.headmasterReducer.isLoading,
    mentees: state.headmasterReducer.mentees,
  };
};

export default connect(mapStateToProps, { fetchMentees })(MiniMenteeList);
