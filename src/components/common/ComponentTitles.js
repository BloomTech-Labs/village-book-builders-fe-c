import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: left;
`;

const ComponentTitle = props => {
  return <Title>{props.titleText}</Title>;
};

export default ComponentTitle;

ComponentTitle.propTypes = {
  titleText: PropTypes.string.isRequired,
};
