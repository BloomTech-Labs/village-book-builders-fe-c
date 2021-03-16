import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Divider, Table, Input, Avatar, Tag, Button, Modal } from 'antd';
import moment from 'moment';
import { fetchMentors as fetchMentorsAction } from '../../../state/actions/index';
import MentorProfile from './MentorProfile';

const MentorList = ({ mentors, fetchMentorsAction: fetchMentors }) => {
  const [search, setSearch] = useState('');
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [currentMentor, setCurrentMentor] = useState({});

  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  const handleOk = () => {
    //console.log('form', formState);
    // setLoading(true);
    // addMentee(formState);
    // setTimeout(() => {
    //   setLoading(false);
    //   setIsModalVisible(false);
    // }, 3000);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };

  const columns = [
    {
      title: 'Name',
      key: 'last_name',
      render: record => record.first_name + ' ' + record.last_name,
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
              setCurrentMentor(record);
              setIsModalVisible1(true);
            }}
          >
            More Info
          </Button>
        </div>
      ),
    },
  ];

  let data2 = [
    ...mentors.map(mentor => ({
      key: mentor.id,
      mentee_picture: mentor.mentor_picture,
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
        <h1 id="menteeTitle">Mentors</h1>
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
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isloading: state.headmasterReducer.isLoading,
    mentors: state.headmasterReducer.mentors,
  };
};

export default connect(mapStateToProps, { fetchMentorsAction })(MentorList);
