import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Divider, List, Avatar, Modal, Button } from 'antd';
import { fetchMentors as fetchMentorsAction } from '../../../../state/actions/index';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import MiniMentorProfile from '../../Mentor/MiniMentorProfile';

const MiniMentorList = ({
  mentors,
  fetchMentorsAction: fetchMentors,
  userId,
}) => {
  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  const ModalButtonMentorList = styled.button`
    color: white;
    font-weight: bold;
    width: 50px;
    display: block;
    border-radius: 0.5rem;
    margin: 0.1rem 0;
  `;

  let history = useHistory();

  const handlePushMentorList = e => {
    history.push('/mentor-list');
  };

  const [showModal, setShowModal] = useState(false);
  const [currentMentor, setCurrentMentor] = useState({});

  console.log(mentors);

  const handleClickModal = item => {
    setShowModal(true);
    setCurrentMentor(item);
  };

  const handleOk = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="miniList">
      <div>
        <Divider />
        <List
          itemLayout="vertical"
          dataSource={mentors}
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
              <ModalButtonMentorList
                style={{ backgroundColor: 'orange' }}
                type="primary"
                onClick={() => handleClickModal(item)}
                dataSource={mentors}
              >
                Info
              </ModalButtonMentorList>
              <Modal
                visible={showModal}
                onCancel={handleCancel}
                onOk={handleOk}
                title="Profile"
                id={currentMentor.id}
                width={460}
                footer={[
                  <Button type="button" onClick={handlePushMentorList}>
                    More Info
                  </Button>,
                  <Button key="back" onClick={handleCancel}>
                    Return
                  </Button>,
                ]}
              >
                <MiniMentorProfile currentMentor={currentMentor} />
              </Modal>
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
    userId: state.authReducer.userId,
    isloading: state.headmasterReducer.isLoading,
    mentors: state.headmasterReducer.mentors,
  };
};

export default connect(mapStateToProps, { fetchMentorsAction })(MiniMentorList);
