import React, { useState } from 'react';
import { connect } from 'react-redux';
// import MiniMentorList from './MiniMentorList'; // plan to use to display data
// import MiniMenteeList from './MiniMenteeList'; // plan to use to display data
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

// mentor w/o an appt -> modal will contain:
// list of available mentees
// list of available computers
// back button
// assign mentee button
// assign computer button
// cancel mentee appointment
// change computer button

const MatchingModal = props => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible(true);
      setLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Mentor Name (map among)
      </Button>
      <Modal
        visible={visible}
        title="Mentor Name"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Assign Mentee
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Assign Computer
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Cancel Mentor/Mentee
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Cancel Computer
          </Button>,
        ]}
      >
        <p>List of avail Mentees</p>
        <p>List of avail computers</p>
      </Modal>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isloading: state.headmasterReducer.isLoading,
    mentees: state.headmasterReducer.mentees,
  };
};

export default MatchingModal;
