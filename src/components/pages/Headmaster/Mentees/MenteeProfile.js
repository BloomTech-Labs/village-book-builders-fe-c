import { Avatar, Collapse, Row, Col, Alert } from 'antd';
import React from 'react';
//import { debugLog } from '../../../../utils/debugMode';
import { CarryOutOutlined, UserOutlined } from '@ant-design/icons';
import '../../../../style.css';

const MenteeProfile = ({ currentMentee }) => {
  const { Panel } = Collapse;
  // debugLog(
  //   'Prop drilled from Mentees.js',
  //   currentMentee,
  //   moment.utc(currentMentee.dob).format('dddd, MMMM Do of YYYY')
  // );
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
                {currentMentee.first_name + ' ' + currentMentee.last_name}
                <span style={{ marginRight: '3px', marginLeft: '5px' }}>
                  {currentMentee.hasAssignedMenter ? (
                    <UserOutlined
                      style={{ fontSize: '17px', color: '#f5222d' }}
                    />
                  ) : (
                    ''
                  )}
                </span>
                <span>
                  {currentMentee.hasAppointment ? (
                    <CarryOutOutlined
                      style={{ fontSize: '17px', color: '#2d3eff' }}
                    />
                  ) : (
                    ''
                  )}
                </span>
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
                {currentMentee.dynamic_questions &&
                  currentMentee.dynamic_questions.map(question => {
                    return (
                      <Panel header={question.question} key={question.qId}>
                        <p>{question.answer}</p>
                      </Panel>
                    );
                  })}
              </Collapse>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default MenteeProfile;
