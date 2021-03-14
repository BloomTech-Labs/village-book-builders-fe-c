import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Divider, List, Avatar, Modal, Button } from 'antd';
import { fetchMentees as fetchMenteesAction } from '../../../../state/actions/index';
import styled from 'styled-components';

const MiniMenteeList = props => {
  const { fetchMenteesAction: fetchMentees } = props;

  useEffect(() => {
    fetchMentees();
  }, [fetchMentees]);

  const ModalButtonMenteeList = styled.button`
    color: white;
    font-weight: bold;
    background-color: green;
    width: 100%;
    display: block;
    border-radius: 0.5rem;
    margin: 0.1rem 0;
  `;

  const [showModal, setShowModal] = useState(false);
  const [currentMentor, setCurrentMentor] = useState({});

  const handleClickModal = () => {
    setShowModal(true);
  };

  const handleOk = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

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
              <ModalButtonMenteeList
                style={{ backgroundColor: 'green' }}
                type="primary"
                onClick={handleClickModal}
              >
                Mentors
              </ModalButtonMenteeList>
              <Modal
                visible={showModal}
                onCancel={handleCancel}
                title={item.first_name + ' ' + item.last_name}
                email={item.email}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Return
                  </Button>,
                ]}
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

export default connect(mapStateToProps, { fetchMenteesAction })(MiniMenteeList);
