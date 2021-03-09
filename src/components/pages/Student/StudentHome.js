import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { List, Avatar } from 'antd';
import { fetchStudentResources } from '../../../state/actions';

const StudentHome = ({ fetchStudentResources, studentResource, isLoading }) => {
  useEffect(() => {
    fetchStudentResources(1); // change this later with login
  }, [fetchStudentResources]);
  console.log('student resources:', studentResource);

  const listData = [];

  for (let i = 0; i < studentResource.length; i++) {
    listData.push({
      href: studentResource.siteUrl,
      title: studentResource.name,
      avatar: studentResource.image_Url,
    });
  }

  return (
    <div>
      {isLoading ? (
        '...loading'
      ) : (
        <div className="form-container">
          <div>
            <h1 style={{ textAlign: 'center' }} className="page-title">
              Student Resources
            </h1>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={listData}
              footer={
                <div>
                  <b>Student Resources</b>
                </div>
              }
              renderItem={item => (
                <List.Item
                  key={item.title}
                  extra={
                    <img
                      width={272}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                  />
                </List.Item>
              )}
            />
            ,
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.resourceReducer.isLoading,
    studentResource: state.resourceReducer.studentResource,
  };
};

export default connect(mapStateToProps, { fetchStudentResources })(StudentHome);
