import React from 'react';
import styled from 'styled-components';

function MatchCell({ match, className }) {
  const { computerId, time, mentee, mentor } = match;
  const Cell = styled.div`
    width: 95%;
    margin: 0;
    padding: 0.2rem;
    color: green;
    background-color: ${mentee && mentor ? '#cfe3bf' : '#f4e6e6'};
    border-radius: 0.5rem;
    text-align: center;
  `;

  const Header = styled.h4``;

  const Option = styled.a`
    color: white;
    font-weight: bold;
    background-color: ${mentee && mentor ? '#334814' : '#8e2727'};
    width: 100%;
    display: block;
    border-radius: 0.5rem;
    margin: 0.1rem 0;
  `;

  return (
    <Cell>
      <Header>
        Computer # {computerId} @ {time}
      </Header>
      <Option>{mentee ? mentee : '(Not Assigned)'}</Option>
      <Option>{mentor ? mentor : '(Not Assigned)'}</Option>
      {/* onClick -- opens up modal with necessary information */}
    </Cell>
  );
}

export default MatchCell;
