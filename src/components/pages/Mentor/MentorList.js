import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Divider, List, Avatar } from 'antd';
import Moment from 'moment';
import { fetchMentors } from '../../../state/actions/index';

const MentorList = props => {
  const { fetchMentors } = props;

  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  return (
    <div className="menteeContainer">
      <h1 id="menteeTittle">Mentor Advisors</h1>
      <div className="exploreWrapper">
        <Divider />
        <List
          itemLayout="vertical"
          dataSource={props.mentors}
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
                description={Moment(item.dob).format('DD-MM-YYYY')}
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

const mapStateToProps = state => {
  return {
    isloading: state.headmasterReducer.isLoading,
    mentors: state.headmasterReducer.mentors,
  };
};

export default connect(mapStateToProps, { fetchMentors })(MentorList);
