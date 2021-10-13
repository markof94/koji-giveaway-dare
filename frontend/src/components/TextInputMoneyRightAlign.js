import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AutowidthInput from 'react-autowidth-input';
import { defaultFont } from 'resources/util/constants';

const Container = styled.div`
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2px;
`;

const Input = styled(AutowidthInput)`
  position: relative;
  outline: none;
  height: 50px;
  resize: none;
  border: 1px solid #999999;
  border-radius: 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: -0.41px;
  color: #000000;
  font-family: ${defaultFont};
  background: transparent;
  padding: 0;

  &::placeholder{
    color: #999999;
  }

  ${(props) => props.invalid === 1 && `
      border-color: red;
  `}

  ${(props) => props.borderRadius && `
    border-radius: ${props.borderRadius}px;
  `}
`;

const Adornment = styled.label`
  font-size: 17px;
  line-height: 21px;
  padding-top: 1px;
  user-select: none;
  margin-right: 2px;

  ${(props) => props.error && `
    color: #F44336;
  `}
`;

const TextInputMoneyRightAlign = (props) => {
  const {
    value,
    onChange,
    errorLabel,
    borderRadius = 10,
    type,
  } = props;

  const isInvalid = errorLabel && errorLabel !== '';

  return (
    <Container
      isInvalid={isInvalid}
    >
      <Adornment
        error={isInvalid}
        for="prize-input"
      >
        $
      </Adornment>
      <Input
        id="prize-input"
        value={value}
        onChange={onChange}
        invalid={isInvalid ? 1 : 0}
        borderRadius={borderRadius}
        hasText={value !== ''}
        type={type}
        autoCapitalize="none"
        pattern="[0-9]*"
        extraWidth={2}
        placeholder="0"
        placeholderIsMinWidth
      />
    </Container>
  );
};

TextInputMoneyRightAlign.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  errorLabel: PropTypes.string,
  borderRadius: PropTypes.number,
  type: PropTypes.string,
};

export default TextInputMoneyRightAlign;
