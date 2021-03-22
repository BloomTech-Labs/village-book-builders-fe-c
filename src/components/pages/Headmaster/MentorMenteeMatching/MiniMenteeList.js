import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Divider, List, Avatar, Modal, Button } from 'antd';
import { fetchMentees as fetchMenteesAction } from '../../../../state/actions/index';
import styled from 'styled-components';
import MiniMenteeProfile from '../Mentees/MiniMenteeProfile';
import { useHistory } from 'react-router-dom';

const MiniMenteeList = ({
  mentees,
  fetchMenteesAction: fetchMentees,
  userId,
}) => {
  useEffect(() => {
    fetchMentees();
  }, [fetchMentees]);

  const ModalButtonMenteeList = styled.button`
    color: white;
    font-weight: bold;
    width: 50px;
    display: block;
    border-radius: 0.5rem;
    margin: 0.1rem 0;
  `;

  let history = useHistory();

  const handlePushMenteeList = e => {
    history.push('/mentor-pairings');
  };

  const [showModal, setShowModal] = useState(false);
  const [currentMentee, setCurrentMentee] = useState({});

  console.log(mentees);
  console.log(currentMentee);
  const handleClickModal = item => {
    setShowModal(true);
    setCurrentMentee(item);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="miniList">
      <div>
        <Divider />
        <List
          itemLayout="vertical"
          dataSource={mentees}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item.mentee_picture} />}
                title={item.first_name + ' ' + item.last_name}
                id={item.id}
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
              <ModalButtonMenteeList
                style={{ backgroundColor: 'orange' }}
                type="primary"
                onClick={() => handleClickModal(item)}
                dataSource={mentees}
              >
                Info
              </ModalButtonMenteeList>
              <Modal
                visible={showModal}
                onCancel={handleCancel}
                onOk={handleOk}
                title="Profile"
                id={currentMentee.id}
                width={460}
                footer={[
                  <Button type="button" onClick={handlePushMenteeList}>
                    More Info
                  </Button>,
                  <Button key="back" onClick={handleCancel}>
                    Return
                  </Button>,
                ]}
              >
                <MiniMenteeProfile currentMentee={currentMentee} />
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
    mentees: state.headmasterReducer.mentees,
  };
};

export default connect(mapStateToProps, { fetchMenteesAction })(MiniMenteeList);
