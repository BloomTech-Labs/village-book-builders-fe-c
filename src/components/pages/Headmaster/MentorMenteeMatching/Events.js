import React from 'react';
import styled from 'styled-components';

const EventWrapper = styled.div`
  background-color: lightgray;
  height: 100%;
  width: 100%;
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
    props.mentee &&
    props.mentor &&
    props.mentee.length > 0 &&
    props.mentor.length > 0
      ? '#cfe3bf'
      : '#f4e6e6'};
  border-radius: 0.5rem;
  text-align: center;
  overflow: hidden;
`;

const Option = styled.span`
  color: white;
  font-weight: bold;
  background-color: ${props =>
    props.mentee &&
    props.mentor &&
    props.mentee.length > 0 &&
    props.mentor.length > 0
      ? '#334814'
      : '#8e2727'};
  width: 100%;
  display: block;
  border-radius: 0.5rem;
  margin: 0.1rem 0;
`;

// const Header = styled.h4``;

function Events({ event, addSession, removeSession, removeEvent }) {
  const { sessions } = event.extendedProps;

  const onRightClick = (e, eventInfo) => {
    e.preventDefault();
    removeEvent(eventInfo);
  };

  return (
    <EventWrapper
      onContextMenu={e => {
        onRightClick(e, event);
      }}
    >
      {sessions.map(({ mentee, mentor }, i) => (
        <Cell mentee={mentee} mentor={mentor} key={i}>
          <Option mentee={mentee} mentor={mentor}>
            {mentor && mentor.length > 0
              ? mentor[0].first_name + ' (M)'
              : '(Not Assigned)'}
          </Option>
          <Option mentee={mentee} mentor={mentor}>
            {mentee && mentee.length > 0
              ? mentee[0].first_name + ' (S)'
              : '(Not Assigned)'}
          </Option>
        </Cell>
      ))}
    </EventWrapper>
  );
}

export default Events;
