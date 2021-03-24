import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../../../../state/actions';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

const PersonInfoModal = props => {
  const personInfoModalVisible = useSelector(
    state => state.calendarReducer.personInfoModalVisible
  );
  const PersonInfoModal = useSelector(
    state => state.calendarReducer.PersonInfoModal
  );

  const dispatch = useDispatch();

  const handleOk = () => {
    console.log('Should be rendering person info');
  };

  const handleCancel = () => {
    dispatch(hideModal());
  };

  const seeDetailedProfile = () => {
    console.log('Should eventually link to user profiles');
  };

  return (
    <>
      <Modal
        visible={personInfoModalVisible}
        title={`${PersonInfoModal.first_name} ${PersonInfoModal.last_name}`}
        onOk={handleOk}
        onCancel={handleCancel}
        className={props.className}
        footer={[
          <Button onClick={seeDetailedProfile}>
            See Detailed Profile Information
          </Button>,
        ]}
      >
        <p>
          <b>DOB</b>: {PersonInfoModal.dob}{' '}
        </p>
        <p>
          <b>Gender</b>: {PersonInfoModal.gender}{' '}
        </p>
        <p>
          <b>Primary Language</b>:{PersonInfoModal.primary_language}{' '}
        </p>
        <p>
          <b>Academic Description</b>: {PersonInfoModal.academic_description}{' '}
        </p>
      </Modal>
    </>
  );
};

export default PersonInfoModal;
