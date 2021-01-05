import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../../utils/axiosWithAuth';
import { List, Avatar } from 'antd';
import { connect } from 'react-redux';
import { checkToken, fetchMentees } from '../../../../state/actions/index';
const Mentees = props => {
  // const [mentees, setMentees] = useState([...props.mentees])
  let menteesSelection = props.mentees;
  useEffect(() => {
    props.fetchMentees();
    // setMentees(mentees)
    // console.log(props.mentees);
  }, []);

  return (
    <div className="menteeContainer">
      <h1 id="menteeTittle">Mentee Management</h1>
      <div className="exploreWrapper">
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
  // let f20Mentees = [];
  // if (state.headmasterReducer.mentees.length < 1) {
  //   for (let index = 0; index < 2; index++) {
  //     f20Mentees.push(state.headmasterReducer.mentees[index]);
  //   }
  // } else {
  //   f20Mentees = state.headmasterReducer.mentees;
  // }

  return {
    mentees: state.headmasterReducer.mentees,
    userId: state.loginReducer.userId,
    role: state.loginReducer.role,
  };
};

export default connect(mapStateToProps, { checkToken, fetchMentees })(Mentees);
