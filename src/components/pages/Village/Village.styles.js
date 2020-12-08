import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  text-align: left;
  width: 66%;
  border: 1px solid gray;
  border-radius: 20px;
`;

export const VillageProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  p {
    font-size: 1.2rem;
  }
`;

export const Label = styled.h4`
  display: inline;
  font-weight: 800;
  margin-right: 0.6rem;
  width: fit-content;
`;
