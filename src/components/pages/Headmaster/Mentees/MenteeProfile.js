import { Avatar, Collapse, Row, Col, Alert } from 'antd';
import moment from 'moment';
import React from 'react';
//import { debugLog } from '../../../../utils/debugMode';
import '../../../../style.css';

const MenteeProfile = ({ currentMentee }) => {
  const { Panel } = Collapse;
  // debugLog(
  //   'Prop drilled from Mentees.js',
  //   currentMentee,
  //   moment.utc(currentMentee.dob).format('dddd, MMMM Do of YYYY')
  // );
  // const columns = [
  //   {
  //     title: 'Contact Hours - From',
  //     dataIndex: 'as_early_as',
  //     key: 'as_early_as',
  //   },
  //   {
  //     title: 'Contact Hours - Until',
  //     dataIndex: 'as_late_as',
  //     key: 'as_late_as',
  //   },
  //   {
  //     title: 'Time Zone (UTC)',
  //     dataIndex: 'time_zone',
  //     key: 'time_zone',
  //   },
  //   {
  //     title: 'Methods',
  //     dataIndex: 'methods',
  //     key: 'methods',
  //     render: tags => (
  //       <>
  //         {tags.map(tag => {
  //           return (
  //             <Tag color="geekblue" key={tags.indexOf(tag)}>
  //               {tag.toUpperCase()}
  //             </Tag>
  //           );
  //         })}
  //       </>
  //     ),
  //   },
  // ];
  return (
    <div className="menteeProfileWrapper">
      {!currentMentee ? (
        // <Skeleton />
        <Alert
          message="Mentee not found.."
          type="error"
          style={{
            marginBottom: '10px',
            borderRadius: 'unset',
            maxWidth: '480px',
          }}
        />
      ) : (
        <>
          <Row gutter={16} style={{ width: '100%' }}>
            <Col className="gutter-row" span={8}>
              <Avatar
                src={currentMentee.mentee_picture}
                size={250}
                style={{ alignSelf: 'center', borderRadius: 'unset' }}
                shape="square"
              />
              <h1 style={{ alignSelf: 'center', marginBottom: '0' }}>
                {currentMentee.name}
              </h1>
              <p style={{ fontStyle: 'italic', marginBottom: '0' }}>
                {currentMentee.availability.time_zone}
              </p>
              <p>{currentMentee.email}</p>
              <p style={{ marginBottom: '0', marginTop: '15px' }}>
                <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  Primary Language
                </span>
                : {currentMentee.primary_language}
              </p>
              <p>
                <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  English
                </span>
                : {currentMentee.english_lvl},{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  Math
                </span>
                : {currentMentee.math_lvl},{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  Reading
                </span>
                : {currentMentee.reading_lvl},{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  School
                </span>
                : {currentMentee.school_lvl}
              </p>
            </Col>
            <Col className="gutter-row" span={16}>
              <p>
                <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  Academic Description
                </span>
                : {currentMentee.academic_description}
              </p>
              <p>
                <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  Support Needed
                </span>
                : {currentMentee.support_needed}
              </p>
              <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                Additional Information
              </p>
              <Collapse accordion>
                {currentMentee.questions &&
                  currentMentee.questions.map(question => {
                    return (
                      <Panel header={question.question} key={question.qId}>
                        <p>{question.answer}</p>
                      </Panel>
                    );
                  })}
              </Collapse>
            </Col>
          </Row>
          {/* <Avatar
            src={currentMentee.mentee_picture}
            size={250}
            style={{ alignSelf: 'center' }}
          />
          <Divider size="large" />
          
          <Divider plain>Email</Divider>
          <p>{currentMentee.email}</p>
          <Divider plain>Languages (left to rigth)</Divider>
          <p>{currentMentee.primary_language}</p>
          <Divider plain>Gender</Divider>
          <p>{currentMentee.gender}</p>
          <Divider plain>Date of Birth</Divider>
          <p>{moment.utc(currentMentee.dob).format('dddd, MMMM Do of YYYY')}</p>
          <Divider plain>Mentor</Divider>
          <p>
            {currentMentee.mentorId ? currentMentee.mentorId : 'Unassigned'}
          </p>
          <Divider plain>Grades</Divider>
          <p>{`English :${currentMentee.english_lvl}`}</p>
          <p>{`Math :${currentMentee.math_lvl}`}</p>
          <p>{`Reading :${currentMentee.reading_lvl}`}</p>
          <p>{`School :${currentMentee.school_lvl}`}</p>
          <Divider plain>Academic Description</Divider>
          <p>{currentMentee.academic_description}</p>
          <Divider plain>Support Areas</Divider>
          <p>{currentMentee.support_needed}</p>
          <Divider plain>Availability</Divider> */}
          {/* <Table
            align="center"
            pagination={false}
            size="small"
            tableLayout="fixed"
            dataSource={[currentMentee.availability]}
            columns={columns}
            key="table"
          /> */}
          {/* <Divider plain>Other Questions</Divider>
          {currentMentee.questions && currentMentee.questions.map(question => {
            return (
              <div key={question.qId}>
                <Divider plain>{question.question}</Divider>
                <p>{question.answer}</p>
              </div>
            );
          })} */}
        </>
      )}
    </div>
  );
};

export default MenteeProfile;
