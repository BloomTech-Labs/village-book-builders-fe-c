import React from 'react';
import { connect } from 'react-redux';
import { showModal, hideModal } from '../../../../state/actions';
import { Modal, Button } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';

// mentor w/o an appt -> modal will contain:
// list of available mentees
// list of available computers
// back button
// assign mentee button
// assign computer button
// cancel mentee appointment
// change computer button

const ModalButton = styled.button`
  color: white;
  font-weight: bold;
  background-color: green;
  width: 100%;
  display: block;
  border-radius: 0.5rem;
  margin: 0.1rem 0;
`;

const MatchingModal = props => {
  const {
    date,
    time,
    duration,
    mentor,
    mentee,
    computerId,
  } = props.matchingModal;
  const matchingModalVisible = props.matchingModalVisible;
  const { showModal, hideModal } = props;

  const handleOk = () => {
    console.log('Should be updating match');
  };

  const handleCancel = () => {
    hideModal();
  };

  return (
    <>
      <ModalButton
        style={{ backgroundColor: 'green' }}
        type="primary"
        onClick={showModal}
      >
        Mentor Name (map among)
      </ModalButton>
      <Modal
        visible={matchingModalVisible}
        title="Mentor Name"
        onOk={handleOk}
        onCancel={handleCancel}
        className={props.className}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Assign Mentee
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Assign Computer
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Cancel Mentor/Mentee
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Cancel Computer
          </Button>,
        ]}
      >
        Selected date: {date}
        Selected time: {time}
        Selected duration: {duration}
        Selected mentor: {mentor}
        Selected mentee: {mentee}
        Selected computerId: {computerId}
      </Modal>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isloading: state.headmasterReducer.isLoading,
    matchingModal: state.headmasterReducer.matchingModal,
    matchingModalVisible: state.headmasterReducer.matchingModalVisible,
  };
};

export default connect(mapStateToProps, { hideModal, showModal })(
  MatchingModal
);
