import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled(motion.div)`
  position: absolute;
  left: -70px;
  bottom: calc(100% + 20px);
  width: 200px;

  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  letter-spacing: -0.08px;
  color: #111111;
  padding: 20px 10px;
  background: #FFFFFF;
  white-space: pre-wrap;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.15));
  border-radius: 6px;
  z-index: 5;
  pointer-events: none;

  :after {
    content: "";
    position: absolute;
    top: 100%;
    left: calc(50% + 3px);
    margin-left: -10px;
    border-width: 7px;
    border-style: solid;
    border-color: #FFFFFF transparent transparent transparent;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.15));
  }
`;

const Tooltip = ({
  label,
  onClick,
  left,
  right,
}) => (
  <Container
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      if (onClick) {
        onClick();
      }
    }}
    initial={{
      scale: 0.5,
      opacity: 0,
    }}
    animate={{
      scale: 1,
      opacity: 1,
    }}
    exit={{
      scale: 0.5,
      opacity: 0,
    }}
    transition={{
      duration: 0.3,
      ease: 'circOut',
    }}
    left={left}
    right={right}
  >
    {label}
  </Container>
);

Tooltip.propTypes = {
  label: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  onClick: PropTypes.func,
};

export default Tooltip;
