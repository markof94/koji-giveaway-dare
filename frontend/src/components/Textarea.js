import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { defaultFont } from 'resources/util/constants';
import { TextareaAutosize } from '@material-ui/core';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const TextInput = styled(TextareaAutosize)`
  position: relative;
  outline: none;
  width: 100%;
  resize: none;
  border: 1px solid #999999;
  border-radius: 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #000000;
  font-family: ${defaultFont};
  padding: 15px;
  padding-top: 30px;
  padding-bottom: 18px;
  background: transparent;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &::placeholder{
    color: #999999;
  }

  ${(props) => props.isFocused && `
    border-color: #007AFF;
    padding-top: 30px;
  `}

  ${(props) => props.hasContent && !props.isFocused && `
    padding-top: 30px;
  `}

  ${(props) => props.invalid === 1 && `
    border-color: #F44336;
  `}

`;

const PersistentLabel = styled.div`
  position: absolute;
  left: 1px;
  top: 1px;
  padding-left: 15px;
  padding-top: 12px;
  padding-bottom: 2px;
  width: calc(100% - 20px);
  border-radius: 10px 10px 0 0;
  font-size: 12px;
  line-height: 18px;

  font-style: normal;
  font-weight: normal;
  color: #4F4F4F;
  pointer-events: none;
  transition: all 0.2s ease;

  ${(props) => props.isFocused && `
    color: #007AFF;
    font-size: 12px;
    line-height: 18px;
  `}

  ${(props) => props.hasContent && !props.isFocused && `
    font-size: 12px;
    line-height: 18px;
  `}
  
  ${(props) => props.isInvalid && `
    color: #F44336;
  `}
`;

const CharacterCounter = styled.div`
    position: absolute;
    top: calc(100%);
    right: 13px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    text-align: right;
    color: #757575;
    opacity: 0;
    transition: all 0.15s ease;

    ${(props) => props.isInvalid && `
        color: #F44336;
    `}

    ${(props) => props.isVisible && `
        opacity: 1;
    `}
`;

const InputError = styled.div`
  position: absolute;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #F44336;
  margin-left: 13px;
  top: calc(100% - 2px);
`;

const TextArea = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    persistentLabel,
    value,
    onChange,
    placeholder,
    maxLength,
    isInvalid,
  } = props;

  const isExceedingMaxLength = value.length > maxLength;

  let errorLabel = '';
  if (isInvalid) {
    if (value.length === 0) errorLabel = 'Required';
  }

  return (
    <Container>
      <TextInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rowsMin={3}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        invalid={(isExceedingMaxLength || isInvalid ? 1 : 0)}
        isFocused={isFocused}
        hasContent={value !== ''}
        spellCheck="false"
        maxLength={maxLength}
      />
      <PersistentLabel
        isInvalid={isExceedingMaxLength || isInvalid}
        isFocused={isFocused}
        hasContent={value !== ''}
      >
        {persistentLabel}
      </PersistentLabel>

      {maxLength && (
        <CharacterCounter
          isInvalid={isExceedingMaxLength}
          isVisible={isFocused || isExceedingMaxLength}
        >
          {`${value.length}/${maxLength}`}
        </CharacterCounter>
      )}

      {
        errorLabel !== '' &&
        <InputError>{errorLabel}</InputError>
      }
    </Container>
  );
};

TextArea.propTypes = {
  persistentLabel: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  isInvalid: PropTypes.bool,
};

export default TextArea;
