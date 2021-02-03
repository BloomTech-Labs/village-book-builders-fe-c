import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { List, Avatar, Form } from 'antd';
import { fetchStudentResources } from '../../../state/actions';

const StudentHome = ({ fetchStudentResources, studentResource, isLoading }) => {
  useEffect(() => {
    fetchStudentResources(1); // change this later with login
  }, []);
  console.log('student resources:', studentResource);

  const listData = [];

  for (let i = 0; i < 23; i++) {
    listData.push({
      href: 'https://ant.design',
      title: `ant design part ${i}`,
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
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
                  <b>ant design</b> footer part
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
                    description={item.description}
                  />
                  {item.content}
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
