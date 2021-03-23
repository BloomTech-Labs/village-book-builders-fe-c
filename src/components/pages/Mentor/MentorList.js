import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Divider, Table, Input, Avatar, Tag, Button, Modal, Alert } from 'antd';
import moment from 'moment';
import {
  fetchMentors as fetchMentorsAction,
  deleteMentor as deleteMentorAction,
  addMentor as addMentorAction,
  editMentorProfile as editMentorProfileAction,
} from '../../../state/actions/index';
import MentorProfile from './MentorProfile';
import AddMentorForm from './AddMentorForm';
import EditMentorForm from './EditMentorForm';

const MentorList = ({
  mentors,
  fetchMentorsAction: fetchMentors,
  deleteMentorAction: deleteMentor,
  addMentorAction: addMentor,
  editMentorProfileAction: editMentorProfile,
  message,
}) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentMentor, setCurrentMentor] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onSubmitCallback = data => {
    //console.log('data', data);
    setLoading(true);
    addMentor(data);
    setTimeout(() => {
      setLoading(false);
      setIsModalVisible(false);
    }, 1500);
  };

  const onEditCallback = data => {
    //console.log('edit data', data);
    setLoading(true);
    editMentorProfile(data.key, data);
    setTimeout(() => {
      setLoading(false);
      setIsModalVisible2(false);
    }, 1500);
    //window.location.reload();
  };

  const handleOk = () => {
    //console.log('form', formState);
    // setLoading(true);
    // addMentee(formState);
    // setTimeout(() => {
    //   setLoading(false);
    //   setIsModalVisible(false);
    // }, 3000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  const { confirm } = Modal;

  function showDeleteConfirm(key) {
    confirm({
      title: 'Are you sure delete this mentor?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteMentor(key.key);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  //console.log('mentors', mentors);

  const columns = [
    {
      title: 'Name',
      key: 'last_name',
      render: record => record.first_name + ' ' + record.last_name,
    },
    {
      title: '',
      dataIndex: 'mentor_picture',
      key: 'mentor_picture',
      render: image => <Avatar src={image} />,
    },
    { title: 'Email Address', dataIndex: 'email', key: 'email' },
    {
      title: 'Timezone',
      render: record => record.availability.time_zone,
      key: 'time_zone',
    },
    {
      title: 'Primary Language',
      dataIndex: 'primary_language',
      key: 'primary_language',
    },
    {
      title: 'Methods',
      key: 'methods',
      render: record =>
        record.availability.methods.map(method => {
          return (
            <Tag key={method} color="red">
              {method.toUpperCase()}
            </Tag>
          );
        }),
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'x',
      render: record => (
        <div>
          <Button
            size="small"
            onClick={() => {
              setCurrentMentor(record);
              setIsModalVisible1(true);
            }}
          >
            More Info
          </Button>{' '}
          <Button
            size="small"
            onClick={() => {
              setCurrentMentor(record);
              setIsModalVisible2(true);
            }}
          >
            Edit
          </Button>{' '}
          <Button
            size="small"
            onClick={() => {
              showDeleteConfirm(record);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  let data2 = [
    ...mentors.map(mentor => ({
      key: mentor.id,
      mentor_picture: mentor.mentor_picture,
      first_name: mentor.first_name,
      last_name: mentor.last_name,
      gender: mentor.gender,
      dob: moment(mentor.dob),
      academic_description: mentor.academic_description,
      support_needed: mentor.support_needed,
      primary_language: mentor.primary_language,
      availability: mentor.availability,
      email: mentor.email,
    })),
  ];

  const searchHandler = e => {
    setSearch(e.target.value);
  };

  if (Array.isArray(data2)) {
    data2 = data2.filter(
      item =>
        item.first_name.toLowerCase().includes(search.toLowerCase()) ||
        item.last_name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="menteeContainer">
      <div className="exploreWrapper">
        {message && (
          <Alert
            message={message}
            type="success"
            style={{
              marginBottom: '10px',
              borderRadius: 'unset',
              maxWidth: '480px',
            }}
          />
        )}
        <h1 id="menteeTitle">
          Mentees{' '}
          <Button type="primary" size="small" onClick={showModal}>
            Add New
          </Button>
        </h1>
        <Input.Search
          value={search}
          placeholder="Search by Name"
          style={{ width: '20%', marginBottom: '10pt' }}
          onChange={searchHandler}
        />
        <Divider />
        <Table
          columns={columns}
          pagination={{
            pageSizeOptions: ['25', '50'],
            showSizeChanger: true,
          }}
          dataSource={data2}
        />
      </div>
      {/* Modals */}
      <Modal
        title="Mentee Info"
        visible={isModalVisible1}
        onCancel={handleCancel1}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        width={960}
        style={{ top: 20 }}
      >
        <MentorProfile currentMentor={currentMentor} />
      </Modal>
      <Modal
        title="Edit Mentee"
        visible={isModalVisible2}
        onCancel={handleCancel2}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        width={680}
        style={{ top: 20 }}
      >
        <EditMentorForm
          currentMentor={currentMentor}
          onedit={onEditCallback}
          loading={loading}
        />
      </Modal>
      <Modal
        title="Add Mentee"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        width={680}
        style={{ top: 20 }}
      >
        <AddMentorForm onsubmit={onSubmitCallback} loading={loading} />
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isloading: state.headmasterReducer.isLoading,
    mentors: state.headmasterReducer.mentors,
    message: state.headmasterReducer.message,
  };
};

export default connect(mapStateToProps, {
  fetchMentorsAction,
  deleteMentorAction,
  addMentorAction,
  editMentorProfileAction,
})(MentorList);
