import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showModal, hideModal } from '../../../../state/actions';
import { Modal, Button } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const PersonInfoModal = props => {
  const personInfoModalVisible = useSelector(
    state => state.calendarReducer.personInfoModalVisible
  );
  const isLoading = useSelector(state => state.calendarReducer.isLoading);
  const personInfoModal = useSelector(
    state => state.calendarReducer.PersonInfoModal
  );

  const dispatch = useDispatch();

  const handleOk = () => {
    console.log('Should be updating match');
  };

  const handleCancel = () => {
    dispatch(hideModal());
  };

  return (
    <>
      <Modal
        visible={personInfoModalVisible}
        title="Mentor Name"
        onOk={handleOk}
        onCancel={handleCancel}
        className={props.className}
        footer={[
          <Button>See Person Info</Button>,
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
        ]}
      ></Modal>
    </>
  );
};

export default PersonInfoModal;
