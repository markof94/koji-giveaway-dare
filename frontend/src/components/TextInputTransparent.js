import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { defaultFont } from 'resources/util/constants';
import isStringEmpty from '../resources/util/isStringEmpty';

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 15px 0;
`;

const TextInput = styled.input`
  position: relative;
  outline: none;
  width: 100%;
  height: 100%;
  resize: none;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: -0.41px;
  color: #111111;
  font-family: ${defaultFont};
  background: transparent;
  border: 0;
  text-align: left;

  &::placeholder{
    color: #999999;
  }
`;

const CharacterCounter = styled.div`
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    text-align: right;
    color: #757575;
    opacity: 0;
    transition: all 0.15s ease;
    user-select: none;

    ${(props) => props.isInvalid && `
        color: #F44336;
    `}

    ${(props) => props.isVisible && `
        opacity: 1;
    `}
`;

const ErrorLabel = styled(CharacterCounter)`
  color: #F44336;
  right: auto;
  left: 0;
`;

const TextInputTransparent = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    value,
    onChange,
    placeholder,
    maxLength,
    isInvalid,
    onFocus,
    onBlur,
    errorLabel,
  } = props;

  const isExceedingMaxLength = value.length >= maxLength;

  return (
    <Container>
      <TextInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => {
          setIsFocused(true);
          if (onFocus) onFocus();
        }}
        onBlur={() => {
          setIsFocused(false);
          if (onBlur) onBlur();
        }}
        invalid={(isExceedingMaxLength || isInvalid ? 1 : 0)}
        isFocused={isFocused}
        spellCheck="false"
        maxLength={maxLength}
        className="pretty-scroll"
      />

      {maxLength && (
        <CharacterCounter
          isInvalid={isExceedingMaxLength}
          isVisible={isFocused || isExceedingMaxLength}
        >
          {`${value.length}/${maxLength}`}
        </CharacterCounter>
      )}

      {
        !isStringEmpty(errorLabel) && (
          <ErrorLabel
            isVisible
          >
            {errorLabel}
          </ErrorLabel>
        )
      }

    </Container>
  );
};

TextInputTransparent.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  isInvalid: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  errorLabel: PropTypes.string,
};

export default TextInputTransparent;
