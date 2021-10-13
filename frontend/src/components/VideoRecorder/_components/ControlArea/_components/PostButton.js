import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/LoadingSpinner';

const Button = styled.button`
  height: 35px;
  width: 95px;
  align-items: center;
  appearance: none;
  background: #007aff;
  border-radius: 5px;
  border: none;
  color: #fff;
  display: flex;
  flex-direction: row;
  font-family: inherit;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  justify-content: center;
  letter-spacing: -0.3px;
  line-height: 16px;
  text-align: center;
  transition: 0.1s ease transform;
  margin-right: 20px;
  box-sizing: border-box;

  &:active {
    transform: scale(0.95);
  }

  svg {
      color: #ffffff;
  }
`;

const SendButton = ({ onClick, isSaving }) => (
  <Button onClick={onClick} disabled={isSaving}>
    {isSaving ? (
      <LoadingSpinner size={20} color="primary" />
    ) : (
      'Next'
    )}

  </Button>
);

SendButton.propTypes = {
  onClick: PropTypes.func,
  isSaving: PropTypes.bool,
};

export default SendButton;
