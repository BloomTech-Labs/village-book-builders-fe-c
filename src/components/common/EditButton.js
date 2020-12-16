import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Btn = styled.button`
  border: none;
  background-color: #549bea;
  &:hover {
    transition: all 200ms linear;
  }
`;

const Button = props => {
  return <Btn className="l1-btn btn">{props.buttonText}</Btn>;
};

export default Button;

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  classType: PropTypes.string,
  disabled: PropTypes.string,
  handleClick: PropTypes.func,
};
