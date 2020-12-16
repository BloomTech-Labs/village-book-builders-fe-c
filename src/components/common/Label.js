import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled.h4`
  font-weight: bold;
  font-size: 1.4rem;
`;

const Label = props => {
  return <Text>{props.labelText}</Text>;
};

export default Label;

Label.propTypes = {
  labelText: PropTypes.string.isRequired,
  classType: PropTypes.string,
};
