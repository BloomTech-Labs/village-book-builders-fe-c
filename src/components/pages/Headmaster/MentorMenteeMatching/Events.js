import React from 'react';
import styled from 'styled-components';

const Cell = styled.div`
  margin: 0;
  width: 100%;
  height: 100%;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  height: 100%;
  max-height: 30px;
  display: block;
  border-radius: 0.5rem;
  margin: 0.05rem 0;
`;

// const Header = styled.h4``;

function Events({ event, addSession, removeSession, removeEvent }) {
  const { mentor, mentee } = event.extendedProps;

  const onRightClick = (e, eventInfo) => {
    e.preventDefault();
    removeEvent(eventInfo);
  };

  return (
    <Cell
      mentee={mentee}
      mentor={mentor}
      onContextMenu={e => {
        onRightClick(e, event);
      }}
    >
      <Option mentee={mentee} mentor={mentor}>
        {mentor && mentor.length > 0 ? mentor[0].first_name + ' (M)' : '(N/A)'}
      </Option>
      <Option mentee={mentee} mentor={mentor}>
        {mentee && mentee.length > 0 ? mentee[0].first_name + ' (S)' : '(N/A)'}
      </Option>
    </Cell>
  );
}

export default Events;
