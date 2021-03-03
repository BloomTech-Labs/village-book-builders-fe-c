import React, { useEffect, useState } from 'react';
import { Button, Divider, List, Input, Modal, Avatar, Table, Tag } from 'antd';
import { connect } from 'react-redux';
import { checkToken, fetchMentees } from '../../../../state/actions/index';
//import MenteeForm from './MenteeForm';
//import MenteeProfile from './MenteeProfile';
import AddMenteeForm from './AddMenteeForm';
import '../../../../style.css';

const Mentees = ({ mentees, fetchMentees, userId, role }) => {
  //let menteesSelection = [...mentees];
  const [search, setSearch] = useState('');
  let colors = ['red', 'blue', 'green', 'orange', 'yellow'];
  //const [showModal, setShowModal] = useState(false);
  //const [editing, setEditing] = useState(false);
  //const [currentMentee, setCurrentMentee] = useState({});
  // const [menteesDataa, setMenteesData] = useState(null);
  // const [name, setName] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchMentees();
  }, [fetchMentees]);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: '',
      dataIndex: 'image',
      key: 'image',
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
            <Tag
              key={method}
              color={colors[Math.floor(Math.random() * colors.length)]}
            >
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
          <a href="/#">More Info</a> \ <a href="/#">Edit</a> \{' '}
          <a href="/#">Delete</a>
        </div>
      ),
    },
  ];

  let data2 = [
    ...mentees.map(mentee => ({
      key: mentee.id,
      image: mentee.mentee_picture,
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

  console.log('metnees', mentees);
  console.log('data2', data2);

  // const editingHandler = (e, menteeData) => {
  //   if (showModal) {
  //     // Closing Modal
  //     setShowModal(false);
  //     setCurrentMentee({});
  //     setEditing(false);
  //   } else {
  //     // Opening Modal
  //     setShowModal(true);
  //     setCurrentMentee(menteeData);
  //     setEditing(true);
  //   }
  // };

  // const moreInfoHandler = (e, menteeData) => {
  //   if (showModal) {
  //     // Closing Modal
  //     setShowModal(false);
  //     setCurrentMentee({});
  //     setEditing(false);
  //   } else {
  //     // Opening Modal
  //     setShowModal(true);
  //     setCurrentMentee(menteeData);
  //   }
  // };

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
        okButtonProps={{ style: { display: 'none' } }}
        width={1240}
        style={{ top: 20 }}
      >
        <AddMenteeForm />
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
  };
};

export default connect(mapStateToProps, { checkToken, fetchMentees })(Mentees);
