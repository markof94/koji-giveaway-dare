import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  position: absolute;
  height: 100%;
  padding: 0 16px;
  bottom: 0;
  left: 0;

  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -0.24px;
  color: white;
`;

const RetakeButton = ({ onClick }) => (
  <Container onClick={() => onClick()}>
    Retake
  </Container>
);

RetakeButton.propTypes = {
  onClick: PropTypes.func,
};

export default RetakeButton;
