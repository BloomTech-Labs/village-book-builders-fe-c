import styled from 'styled-components';

export const menuButton = {
  width: '100%',
  backgroundColor: '#549bea',
  border: '1px solid #549bea',
  height: '3rem',
};

export const menuIcon = {
  position: 'fixed',
  bottom: '0px',
  width: '100%',
  transition: 'bottom 220ms ease-in',
};

export const menuMove = {
  position: 'fixed',
  bottom: '500px',
  width: '100%',
  transition: 'bottom 220ms ease-in',
};

export const Dashboard = styled.div`
  margin-left: 340px;
  @media screen and (max-width: 800px) {
    margin-left: 0px;
  }
`;
