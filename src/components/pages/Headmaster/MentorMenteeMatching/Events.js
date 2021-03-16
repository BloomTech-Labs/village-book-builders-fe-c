import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const EventWrapper = styled.div`
  background: inherit !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Cell = styled.div`
  margin: 0;
  width: 100%;

  padding: 0.2rem;
  color: green;
  background-color: ${props =>
    props.mentee && props.mentor ? '#cfe3bf' : '#f4e6e6'};
  border-radius: 0.5rem;
  text-align: center;
  overflow: hidden;
`;

const Option = styled.span`
  color: white;
  font-weight: bold;
  background-color: ${props =>
    props.mentee && props.mentor ? '#334814' : '#8e2727'};
  width: 100%;
  display: block;
  border-radius: 0.5rem;
  margin: 0.1rem 0;
`;

const Icon = styled(PlusCircleOutlined)`
  font-size: 40px;
  color: green;
  justify-self: flex-end;
`;

// const Header = styled.h4``;

function Events({ event, addSession, removeSession }) {
  const { mentee, mentor, sessions } = event.extendedProps;

  return (
    <EventWrapper>
      {sessions.map((session, i) => (
        <Cell mentee={mentee} mentor={mentor} key={i}>
          <Option mentee={mentee} mentor={mentor}>
            {mentee ? mentee : '(Not Assigned)'}
          </Option>
          <Option mentee={mentee} mentor={mentor}>
            {mentor ? mentor : '(Not Assigned)'}
          </Option>
        </Cell>
      ))}
      <Icon onClick={() => addSession(event)} />
    </EventWrapper>
  );
}

export default Events;
