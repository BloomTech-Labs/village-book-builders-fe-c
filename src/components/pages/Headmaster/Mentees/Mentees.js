import React, { useEffect, useState } from 'react';
import { Button, Divider, Input, Modal, Avatar, Table, Tag, Alert } from 'antd';
import { connect } from 'react-redux';
import {
  checkToken,
  fetchMentees as fetchMenteesAction,
  deleteMentee as deleteMenteeAction,
  addMentee as addMenteeAction,
  editMenteeProfile as editMenteeProfileAction,
} from '../../../../state/actions/index';
import MenteeProfile from './MenteeProfile';
import AddMenteeForm from './AddMenteeForm';
import EditMenteeForm from './EditMenteeForm';
import { CarryOutOutlined, UserOutlined } from '@ant-design/icons';
import '../../../../style.css';

const Mentees = ({
  mentees,
  fetchMenteesAction: fetchMentees,
  deleteMenteeAction: deleteMentee,
  addMenteeAction: addMentee,
  editMenteeProfileAction: editMenteeProfile,
  userId,
  role,
  message,
  editMessage,
  isLoading,
}) => {
  //let menteesSelection = [...mentees];
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [currentMentee, setCurrentMentee] = useState({});

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onSubmitCallback = data => {
    //console.log('data', data);
    setLoading(true);
    addMentee(data);
    setTimeout(() => {
      setLoading(false);
      setIsModalVisible(false);
    }, 1500);
  };

  const onEditCallback = data => {
    //console.log('edit data', data);
    setLoading(true);
    editMenteeProfile(data.key, data);
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
      title: 'Are you sure delete this mentee?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteMentee(key.key);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  useEffect(() => {
    fetchMentees();
  }, [fetchMentees]);

  const columns = [
    {
      title: 'Name',
      key: 'last_name',
      //render: record => record.first_name + ' ' + record.last_name + ' ' + <UserOutlined /> + ((record.hasAppointment === true) ? <CarryOutOutlined /> : ''),
      render: record => {
        return (
          <p>
            {record.first_name + ' ' + record.last_name}{' '}
            <span style={{ marginRight: '3px' }}>
              {record.hasAssignedMenter ? (
                <UserOutlined style={{ fontSize: '17px', color: '#f5222d' }} />
              ) : (
                ''
              )}
            </span>
            <span>
              {record.hasAppointment ? (
                <CarryOutOutlined
                  style={{ fontSize: '17px', color: '#2d3eff' }}
                />
              ) : (
                ''
              )}
            </span>
          </p>
        );
      },
    },
    {
      title: '',
      dataIndex: 'mentee_picture',
      key: 'mentee_picture',
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
              setCurrentMentee(record);
              setIsModalVisible1(true);
            }}
          >
            More Info
          </Button>{' '}
          <Button
            size="small"
            onClick={() => {
              setCurrentMentee(record);
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
    ...mentees.map(mentee => ({
      key: mentee.id,
      mentee_picture: mentee.mentee_picture,
      first_name: mentee.first_name,
      last_name: mentee.last_name,
      gender: mentee.gender,
      dob: mentee.dob,
      english_lvl: mentee.english_lvl,
      math_lvl: mentee.math_lvl,
      reading_lvl: mentee.reading_lvl,
      school_lvl: mentee.school_lvl,
      hasAssignedMenter: mentee.hasAssignedMentor,
      hasAppointment: mentee.hasAppointment,
      academic_description: mentee.academic_description,
      support_needed: mentee.support_needed,
      primary_language: mentee.primary_language,
      availability: mentee.availability,
      email: mentee.email,
      dynamic_questions: mentee.dynamic_questions,
    })),
  ];

  // console.log('metnees', mentees);
  // console.log('data2', data2);
  // console.log('current', currentMentee);

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
        {(message || editMessage) && (
          <Alert
            message={message || editMessage}
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
        <p style={{ marginBottom: '0', fontSize: '12px' }}>
          <UserOutlined style={{ fontSize: '12px', color: '#f5222d' }} /> has
          mentor
        </p>
        <p style={{ marginBottom: '0', fontSize: '12px' }}>
          <CarryOutOutlined style={{ fontSize: '12px', color: '#2d3eff' }} />{' '}
          has appointment
        </p>
      </div>
      {/* Modals */}
      <Modal
        title="Add Mentee"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        width={1240}
        style={{ top: 20 }}
      >
        <AddMenteeForm onsubmit={onSubmitCallback} loading={loading} />
      </Modal>
      <Modal
        title="Edit Mentee"
        visible={isModalVisible2}
        onCancel={handleCancel2}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        width={1240}
        style={{ top: 20 }}
      >
        <EditMenteeForm
          currentMentee={currentMentee}
          onedit={onEditCallback}
          loading={loading}
        />
      </Modal>
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
        <MenteeProfile currentMentee={currentMentee} />
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    mentees: state.headmasterReducer.mentees,
    userId: state.authReducer.userId,
    role: state.authReducer.role,
    message: state.headmasterReducer.message,
    editMessage: state.menteeReducer.message,
  };
};

export default connect(mapStateToProps, {
  checkToken,
  fetchMenteesAction,
  deleteMenteeAction,
  addMenteeAction,
  editMenteeProfileAction,
})(Mentees);
