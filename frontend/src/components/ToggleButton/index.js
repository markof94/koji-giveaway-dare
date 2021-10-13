import styled from 'styled-components';
import React from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';

const Container = styled.label`
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    width: 100%;

    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;

    ${(props) => props.hasSubLabel && `
      align-items: flex-start;
    `}

    & + & {
      margin-top: 25px;
    }
`;

const LabelWrapper = styled.div`
  margin-left: 10px;
`;

const Label = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: -0.41px;
  color: #FFFFFF;
  margin-bottom: 2px;

  color: ${({ theme }) => theme.colors['textInput.textColor']};
`;

const SubLabel = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.32px;
  color: #FFFFFF;

  color: ${({ theme }) => theme.colors['textInput.textColor']};
`;

const Item = (props) => {
  const {
    isSelected,
    onSelect,
    label,
    subLabel,
    lightTheme,
  } = props;

  return (
    <Container
      hasSubLabel={subLabel && subLabel !== ''}
    >
      <Switch
        checked={isSelected}
        checkedIcon={false}
        uncheckedIcon={false}
        onColor="#007AFF"
        offColor="#B0B0B0"
        onChange={onSelect}
        width={45}
        height={25}
        handleDiameter={21}
      />
      <LabelWrapper>
        {label && (
          <Label
            lightTheme={lightTheme}
          >
            {label}
          </Label>
        )}
        {subLabel && (
          <SubLabel
            lightTheme={lightTheme}
          >
            {subLabel}
          </SubLabel>
        )}
      </LabelWrapper>
    </Container>
  );
};

Item.propTypes = {
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  label: PropTypes.string,
  subLabel: PropTypes.string,
  lightTheme: PropTypes.bool,
};

export default Item;
