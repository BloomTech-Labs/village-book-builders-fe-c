import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  List,
  Input,
  Modal,
  Avatar,
  Table,
  Tag,
  Alert,
} from 'antd';
import { connect } from 'react-redux';
import {
  checkToken,
  fetchMentees,
  deleteMentee,
  addMentee,
} from '../../../../state/actions/index';
//import MenteeForm from './MenteeForm';
import MenteeProfile from './MenteeProfile';
import AddMenteeForm from './AddMenteeForm';

import '../../../../style.css';

const Mentees = ({
  mentees,
  fetchMentees,
  deleteMentee,
  addMentee,
  userId,
  role,
  message,
}) => {
  //let menteesSelection = [...mentees];
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  //const [showModal, setShowModal] = useState(false);
  //const [editing, setEditing] = useState(false);
  //const [currentMentee, setCurrentMentee] = useState({});
  // const [menteesDataa, setMenteesData] = useState(null);
  // const [name, setName] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [currentMentee, setCurrentMentee] = useState({});

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onSubmitCallback = data => {
    //setFormState(data);
    //console.log('data', data);
    setLoading(true);
    addMentee(data);
    setTimeout(() => {
      setLoading(false);
      setIsModalVisible(false);
    }, 2000);
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

  const { confirm } = Modal;

  function showDeleteConfirm(key) {
    confirm({
      title: 'Are you sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        //console.log('OK');
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
    { title: 'Name', dataIndex: 'name', key: 'name' },
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
          \ <a href="/#">Edit</a> \{' '}
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
      name: mentee.first_name + ' ' + mentee.last_name,
      gender: mentee.gender,
      dob: mentee.dob,
      english_lvl: mentee.english_lvl,
      math_lvl: mentee.math_lvl,
      reading_lvl: mentee.reading_lvl,
      school_lvl: mentee.school_lvl,
      academic_description: mentee.academic_description,
      support_needed: mentee.support_needed,
      primary_language: mentee.primary_language,
      availability: mentee.availability,
      email: mentee.email,
      questions: mentee.dynamic_questions,
    })),
  ];

  // console.log('metnees', mentees);
  // console.log('data2', data2);
  console.log('current', currentMentee);

  const searchHandler = e => {
    setSearch(e.target.value);
  };

  if (Array.isArray(data2)) {
    data2 = data2.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
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
        {/* <List
          itemLayout="horizontal"
          dataSource={menteesSelection}
          renderItem={item => (
            <List.Item>
              <div className="listItemWrapper">
                <div className="listItemMeta">
                  <List.Item.Meta
                    onClick={e => moreInfoHandler(e, item)}
                    avatar={<Avatar src={item.mentee_picture} />}
                    title={<a>{item.first_name + ' ' + item.last_name}</a>}
                    description={item.academic_description}
                  />
                </div>
                <div className="listItemButtonWrapper">
                  <Button
                    onClick={e => moreInfoHandler(e, item)}
                    className="listItemButton"
                    size="middle"
                    type="default"
                  >
                    More Info
                  </Button>
                  <Button
                    onClick={e => editingHandler(e, item)}
                    className="listItemButton"
                    danger
                    size="middle"
                    type="default"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </List.Item>
          )}
        /> */}
        <Table
          columns={columns}
          pagination={{
            pageSizeOptions: ['25', '50'],
            showSizeChanger: true,
          }}
          dataSource={data2}
        />
        ,
      </div>
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
      {/* Modal for mentee information */}
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
        {/* <h1>Hello world!</h1> */}
      </Modal>
      {/* <Modal
        className="menteeModal"
        visible={showModal}
        title="Mentee Profile"
        onCancel={moreInfoHandler}
        maskClosable
        destroyOnClose
        okText="Submit"
        footer={[
          <Button
            key="back"
            onClick={editing ? editingHandler : moreInfoHandler}
          >
            Return
          </Button>,
          <Button
            key="submit"
            onClick={editing ? editingHandler : moreInfoHandler}
          >
            Submit
          </Button>,
        ]}
      >
        {editing ? (
          <MenteeForm currentMentee={currentMentee} />
        ) : (
          <MenteeProfile currentMentee={currentMentee} />
        )}
      </Modal> */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    mentees: state.headmasterReducer.mentees,
    userId: state.authReducer.userId,
    role: state.authReducer.role,
    message: state.headmasterReducer.message,
  };
};

export default connect(mapStateToProps, {
  checkToken,
  fetchMentees,
  deleteMentee,
  addMentee,
})(Mentees);
