import { Avatar, Row, Col, Alert } from 'antd';
import React from 'react';
//import { debugLog } from '../../../../utils/debugMode';
import '../../../style.css';

const MiniMentorProfile = ({ currentMentor }) => {
  // const { Panel } = Collapse;
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
      {!currentMentor ? (
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
              <div className="miniMentorAvatar">
                <Avatar
                  src={currentMentor.mentor_picture}
                  size={250}
                  style={{ alignSelf: 'center', borderRadius: 'unset' }}
                  shape="square"
                />
              </div>
              <div className="miniMentorModalText">
                <div className="miniMentorNameText">
                  <h1 style={{ alignSelf: 'center', marginBottom: '0' }}>
                    {currentMentor.first_name + ' ' + currentMentor.last_name}
                  </h1>
                </div>
                <h2 style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  Time Zone
                </h2>
                <p style={{ fontStyle: 'italic', marginBottom: '0' }}>
                  {currentMentor.availability.time_zone}
                </p>
                <h2 style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  Email
                </h2>
                <p>{currentMentor.email}</p>
                <p style={{ marginBottom: '0', marginTop: '15px' }}>
                  <h2 style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                    Primary Language
                  </h2>
                  {currentMentor.primary_language}
                </p>
                <p>
                  <h2 style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                    Available Times
                  </h2>
                  <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                    From
                  </span>
                  : {currentMentor.availability.as_early_as}{' '}
                  <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                    To
                  </span>
                  : {currentMentor.availability.as_late_as}{' '}
                </p>
              </div>
            </Col>
            <Col className="gutter-row" span={16}>
              {/* <p>
                <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  Academic Description
                </span>
                : {currentMentor.academic_description}
              </p>
              <p>
                <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  Support Needed
                </span>
                : {currentMentor.support_needed}
              </p>
              <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                Additional Information
              </p>
              <Collapse accordion>
                {currentMentor.dynamic_questions &&
                  currentMentor.dynamic_questions.map(question => {
                    return (
                      <Panel header={question.question} key={question.qId}>
                        <p>{question.answer}</p>
                      </Panel>
                    );
                  })}
              </Collapse> */}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default MiniMentorProfile;
