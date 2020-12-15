import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const buttonStyle = {};

const Btn = styled.button`
  border: none;
  &:hover {
    transition: all 200ms linear;
  }
  /* display: none; */
`;

const Button = props => {
  // Here is a button for use when simply in need of a button that doesn't require to be wrapped in a form.
  // contains a click property for your use onClick
  return <Btn className="l2-btn btn">{props.buttonText}</Btn>;
};

export default Button;

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  classType: PropTypes.string,
  disabled: PropTypes.string,
  handleClick: PropTypes.func,
};
