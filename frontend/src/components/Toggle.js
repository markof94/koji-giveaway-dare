import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import Tooltip from './Tooltip';

const Wrapper = styled.button`
  width: 100%;
  display: flex;
  align-items: center;

  position: relative;
`;

const Container = styled.div`
  width: 36px;
  min-width: 36px;
  max-width: 36px;
  height: 20px;
  display: flex;
  align-items: center;
  border-radius: 1000px;

  border: 1px solid ${({ theme }) => theme.colors['border.secondary']};

  ${({ on, theme }) => on ? `
    background-color: ${theme.colors['foreground.primary']};
  ` : `
    background-color: ${theme.colors['background.alt']};
  `};
`;

const Item = styled.div`
  height: 16px;
  min-height: 16px;
  max-height: 16px;

  width: 16px;
  min-width: 16px;
  max-width: 16px;

  border-radius: 50%;

  transition: 0.2s ease all;
  transform: ${({ on }) => on ? 'translateX(17px)' : 'translateX(1px)'};

  background-color: ${({ theme }) => theme.colors['background.default']};
`;

const Label = styled.div`
  padding-left: 10px;
  font-size: 17px;
  line-height: 21px;
  color: ${({ theme }) => theme.colors['foreground.default']};
`;

const Toggle = ({ label, isOn, onChange, tooltip, onDismissTooltip }) => (
  <Wrapper onClick={() => onChange(!isOn)}>
    <Container on={isOn}>
      <Item on={isOn} />
    </Container>
    <Label>{label}</Label>
    <AnimatePresence>
      {tooltip && (
        <Tooltip
          label={tooltip}
          onClick={() => onDismissTooltip()}
        />
      )}
    </AnimatePresence>
  </Wrapper>
);

Toggle.propTypes = {
  label: PropTypes.string,
  isOn: PropTypes.bool,
  onChange: PropTypes.func,
  tooltip: PropTypes.string,
  onDismissTooltip: PropTypes.func,
};

export default Toggle;
