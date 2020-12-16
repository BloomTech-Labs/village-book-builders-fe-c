import styled from 'styled-components';

export const Divider = styled.div`
  border-bottom: 1px dotted black;
  padding: 2rem;
`;

export const StyledSchools = styled.div`
  h1 {
    text-align: center;
  }
  & > * {
    background: white;
  }
`;
