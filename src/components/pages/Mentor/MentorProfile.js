import React from 'react';
import { Avatar, Row, Col, Alert } from 'antd';

const MentorProfile = ({ currentMentor }) => {
  return (
    <div className="menteeProfileWrapper">
      {!currentMentor ? (
        // <Skeleton />
        <Alert
          message="Mentor not found.."
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
                src={currentMentor.mentee_picture}
                size={250}
                style={{ alignSelf: 'center', borderRadius: 'unset' }}
                shape="square"
              />
            </Col>
            <Col className="gutter-row" span={16}>
              <h1 style={{ alignSelf: 'center', marginBottom: '0' }}>
                {currentMentor.first_name + ' ' + currentMentor.last_name}
              </h1>
              <p style={{ fontStyle: 'italic', marginBottom: '0' }}>
                {currentMentor.availability.time_zone}
              </p>
              <p>{currentMentor.email}</p>
              <p style={{ marginBottom: '0', marginTop: '15px' }}>
                <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                  Primary Language
                </span>
                : {currentMentor.primary_language}
              </p>
              <p>
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
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default MentorProfile;
