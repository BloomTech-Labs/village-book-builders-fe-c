import React, { useEffect, useState } from 'react';
import { Button, Divider, Input, Modal, List, Avatar, Table, Tag } from 'antd';
import { connect } from 'react-redux';
import { checkToken, fetchMentees } from '../../../../state/actions/index';
import MenteeForm from './MenteeForm';
import MenteeProfile from './MenteeProfile';
import '../../../../style.css';

const Mentees = ({ mentees, fetchMentees, userId, role }) => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: '',
      dataIndex: 'image',
      key: 'image',
      render: image => <Avatar src={image} />,
    },
    { title: 'Email Address', dataIndex: 'email', key: 'email' },
    { title: 'Timezone', dataIndex: 'timezone', key: 'timezone' },
    {
      title: 'Primary Language',
      dataIndex: 'primary_language',
      key: 'primary_language',
    },
    {
      title: 'Methods',
      key: 'methods',
      dataIndex: 'methods',
      render: methods => (
        <>
          {methods.map(method => {
            let colors = ['red', 'blue', 'green'];
            return (
              <Tag
                color={colors[Math.floor(Math.random() * colors.length)]}
                key={method}
              >
                {method.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => (
        <div>
          <a href="/#">More Info</a> \ <a href="/#">Edit</a> \{' '}
          <a href="/#">Delete</a>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description:
        'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      description:
        'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: 3,
      name: 'Not Expandable',
      age: 29,
      address: 'Jiangsu No. 1 Lake Park',
      description: 'This not expandable',
    },
    {
      key: 4,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      description:
        'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
  ];

  let menteesSelection = [...mentees];
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentMentee, setCurrentMentee] = useState({});
  let menteeData = mentees.map(mentee => ({
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
    timezone: mentee.availability.time_zone,
    as_early_as: mentee.availability.as_early_as,
    as_late_as: mentee.availability.as_late_as,
    methods: mentee.availability.methods,
    email: mentee.email,
    questions: mentee.dynamic_questions,
  }));

  const editingHandler = (e, menteeData) => {
    if (showModal) {
      // Closing Modal
      setShowModal(false);
      setCurrentMentee({});
      setEditing(false);
    } else {
      // Opening Modal
      setShowModal(true);
      setCurrentMentee(menteeData);
      setEditing(true);
    }
  };

  const searchHandler = e => {
    setSearch(e.target.value);
  };

  const moreInfoHandler = (e, menteeData) => {
    if (showModal) {
      // Closing Modal
      setShowModal(false);
      setCurrentMentee({});
      setEditing(false);
    } else {
      // Opening Modal
      setShowModal(true);
      setCurrentMentee(menteeData);
    }
  };

  if (Array.isArray(menteesSelection)) {
    menteesSelection = menteesSelection.filter(
      item =>
        item.first_name.toLowerCase().includes(search.toLowerCase()) ||
        item.last_name.toLowerCase().includes(search.toLowerCase())
    );
  }

  useEffect(() => {
    fetchMentees();
  }, [fetchMentees]);

  console.log('mentees2', menteeData);

  return (
    <div className="menteeContainer">
      <h1 id="menteeTitle">Mentees</h1>
      <div className="exploreWrapper">
        <Button
          style={{ width: '80%', marginBottom: '10pt', alignSelf: 'center' }}
          align="center"
        >
          Add New Mentee
        </Button>
        <Input.Search
          value={search}
          placeholder="Search by Name"
          style={{ width: '80%', alignSelf: 'center' }}
          onChange={searchHandler}
        />
        <Divider />
        <List
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
        />
        ,
        <Table
          columns={columns}
          pagination={{
            pageSizeOptions: ['15', '25', '50'],
            showSizeChanger: true,
          }}
          // expandable={{
          //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          //   rowExpandable: record => record.name !== 'Not Expandable',
          // }}
          dataSource={menteeData}
        />
        ,
      </div>
      <Modal
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
      </Modal>
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
