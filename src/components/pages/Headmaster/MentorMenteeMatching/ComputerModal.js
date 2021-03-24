import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import 'antd/dist/antd.css';

const ModalButton = styled.button`
  color: white;
  font-weight: bold;
  background-color: green;
  width: 100%;
  display: block;
  border-radius: 0.5rem;
  margin: 0.1rem 0;
`;

const ComputerModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClickModal = item => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="computerInfo">
      <Modal
        visible={showModal}
        onCancel={handleCancel}
        onClick={handleClickModal}
      ></Modal>
    </div>
  );
};

export default ComputerModal;
